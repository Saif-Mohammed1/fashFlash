class APIFeatures {
  constructor(query, searchParams) {
    this.query = query;
    this.limit;
    this.page;
    this.searchParams = searchParams;
    this.queryString = this.parseSearchParams();
  }

  parseSearchParams() {
    let query = {};

    if (this.searchParams) {
      //console.log("this.searchParams)" + this.searchParams);
      for (const [key, value] of this.searchParams) {
        if (value && value !== "undefined") {
          // Check if the key is a range query (e.g., 'price[gte]')
          const isRangeQuery = key.includes("[") && key.endsWith("]");

          if (isRangeQuery) {
            // Extract the operator and field name from the key
            const operator = key.substring(
              key.indexOf("[") + 1,
              key.indexOf("]")
            );
            const field = key.substring(0, key.indexOf("["));

            // Handle range queries (e.g., 'price[gte]')
            if (!query[field]) {
              query[field] = {};
            }

            // Convert the range query to appropriate Mongoose query format
            query[field][`$${operator}`] = value;
          } else {
            // Handle regular queries (e.g., 'cost')
            query[key] = value;
          }
        }
      }
    }
    //console.log("query", query);
    return query;
  }
  filter() {
    //console.log("this.queryString first", this.queryString);

    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "category"];
    //console.log("queryObj first", queryObj);
    // excludedFields.forEach((el) => delete queryObj[el]);
    excludedFields.forEach((el) => delete queryObj[el]);
    // Check if name or email is provided in the query parameters
    if (queryObj.name) {
      // Use regular expression to match name
      queryObj.name = { $regex: queryObj.name, $options: "i" };
    }
    if (queryObj.email) {
      // Use regular expression to match email
      queryObj.email = { $regex: queryObj.email, $options: "i" };
    }

    // Add filtering by ratingsAverage
    if (queryObj.rating) {
      if (queryObj.rating.includes(",")) {
        const rating = queryObj.rating
          .split(",")
          .map(Number)
          .sort((a, b) => a - b);
        const [minRating, maxRating] = [rating[0], rating[rating.length - 1]];
        queryObj.ratingsAverage = { $gte: minRating, $lte: maxRating };
      } else {
        const rating = queryObj.rating * 1;
        if (rating < 5) {
          const maxRating = rating + 1;
          queryObj.ratingsAverage = { $gte: rating, $lt: maxRating };
        } else {
          queryObj.ratingsAverage = { $eq: rating };
        }
      }
      delete queryObj.rating;
    }

    // console.log("queryObj sec", queryObj);
    this.query = this.query.find(
      //JSON.parse(queryStr)
      queryObj
    );
    this.page = this.queryString.page * 1 || 1;
    this.limit = this.queryString.limit * 1 || 8;
    return this;
  }
  category() {
    if (this.queryString.category) {
      let fields = this.queryString.category.split(",");
      fields = fields.filter((item) => item !== "all");
      if (fields.length >= 1) {
        // Create a regular expression for the category values
        const categoryRegex = fields.map(
          (category) => new RegExp(category, "i")
        );
        // Use the $in operator with the regular expression array
        this.query = this.query.find({ category: { $in: categoryRegex } });
      }
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
      //console.log("this.queryString.sort", this.queryString.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    //page, limit
    // const page = this.queryString.page * 1;
    const skip = (this.page * 1 - 1) * this.limit;
    this.query = this.query.skip(skip).limit(this.limit);

    // const skip = (page - 1) * limit;
    // this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  // async countDocuments() {
  //   // Use clone() to create a new query for counting documents
  //   const countQuery = this.query.model
  //     .find(this.query.getQuery())
  //     .clone()
  //     .countDocuments();
  //   const count = await countQuery;

  //   return count;
  // }
}
export default APIFeatures;
