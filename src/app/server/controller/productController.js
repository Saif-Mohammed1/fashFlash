import AppError from "@/component/util/appError";
import { destroyImage, uploadImage } from "@/component/util/cloudinary";
import path from "path";
import os from "os";
import fs from "fs/promises";
export const createProduct = async (req, Model) => {
  let doc;
  try {
    let formData = await req.formData();
    // let parsedDiscountExpire;
    // if (data.discountExpire) {
    //   parsedDiscountExpire = new Date(data.discountExpire);
    //   if (isNaN(parsedDiscountExpire.getTime())) {
    //     throw new AppError("Invalid discountExpire date format", 400);
    //   } else {
    //     data.discountExpire = parsedDiscountExpire;
    //   }
    // }

    // Initialize an empty object to store form data
    let extractedData = {};

    // Iterate over the FormData entries
    for (let [name, value] of formData.entries()) {
      // Check if the field already exists in the extractedData object
      if (extractedData.hasOwnProperty(name)) {
        // If the field already exists and it's an array, push the new value
        if (Array.isArray(extractedData[name])) {
          extractedData[name].push(value);
        } else {
          // If the field already exists but it's not an array, convert it into an array and push the new value
          extractedData[name] = [extractedData[name], value];
        }
      } else {
        // If the field doesn't exist, add it to the extractedData object
        extractedData[name] = value;
      }
    }
    // Convert single image field to array if necessary
    if (formData.getAll("images").length === 1) {
      const singleImage = formData.getAll("images");

      extractedData.images = singleImage;
    }

    let imgUrl = [];
    let publicId = [];
    if (extractedData.images) {
      if (extractedData.images.length > 4) {
        throw new AppError("Maximum image number is 4.", 400);
      }
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ]; // Add the third specified image type here

      for (const img of extractedData.images) {
        if (!allowedTypes.includes(img.type)) {
          throw new AppError("Unsupported file type.", 400);
        }

        // Check file size (4 MB = 4 * 1024 * 1024 bytes)
        if (img.size > 4 * 1024 * 1024) {
          throw new AppError("Maximum file size is 4MB.", 400);
        }

        const bytes = await img.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const ext = img.type.split("/")[1];
        const name = `user-${req.user._id}-${Date.now()}.${ext}`;

        // this does'nt work in vercel
        const uploadDir = path.join(
          process.cwd(),
          "public/tempProducts",
          "/" + name
        );

        // this work in verce
        // const tempDir = os.tmpdir();
        // const uploadDir = path.join(tempDir, "/" + name);
        fs.writeFile(uploadDir, buffer);
        const { url, public_id } = await uploadImage(
          uploadDir,
          "shop/products"
        );
        imgUrl.push(url);
        publicId.push(public_id);
        // Delete the file after getting the URL
        // fs.unlink(uploadDir, (err) => {
        //   if (err) {
        //     //console.error("Error deleting file:", err);
        //     throw err;
        //   }
        // });
      }
      if (imgUrl.length > 0) {
        extractedData.images = imgUrl;
        extractedData.public_id = publicId;
      }
    }
    doc = await Model.create({ ...extractedData, user: req.user._id });

    return {
      data: doc,
      statusCode: 201,
    };
  } catch (error) {
    if (doc) {
      await Model.findByIdAndDelete(doc._id);
    }
    throw error;
  }
};
export const deleteProduct = async (req, Model) => {
  try {
    const doc = await Model.findById(req.id); //.select("+public_id");

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }
    if (doc.public_id) {
      for (const public_id of doc.public_id) {
        await destroyImage(public_id);
      }
    }
    await Model.findByIdAndDelete(req.id);

    return {
      data: null,
      statusCode: 200,
    };
  } catch (error) {
    throw error;

    // //console.log("err", error);
    // return NextResponse.json({ ...error });
  }
};
// export const updateProductImage = async (req, Model) => {
//   try {
//     const doc = await Model.findById(req.id).select("+public_id");

//     if (!doc) {
//       throw new AppError("No document found with that ID", 404);
//     }
//     if (doc.public_id) {
//       for (const public_id of doc.public_id) {
//         await destroyImage(public_id);
//       }
//     }

//     // Initialize an empty object to store form data
//     let extractedData = {};

//     // Convert single image field to array if necessary
//     if (!Array.isArray(formData.get("images"))) {
//       const singleImage = formData.get("images");
//       //console.log("singleImage", singleImage);
//       extractedData.images = [singleImage];
//     }
//     if (Array.isArray(formData.getAll("images"))) {
//       const Image = formData.get("images");
//       //console.log("Image", Image);
//       extractedData.images = Image;
//     }

//     let imgUrl = [];
//     let publicId = [];
//     if (extractedData.images) {
//       if (extractedData.images.length > 4) {
//         throw new AppError("Maximum image number is 4.", 400);
//       }
//       const allowedTypes = [
//         "image/png",
//         "image/jpeg",
//         "image/jpg",
//         "image/gif",
//       ]; // Add the third specified image type here

//       for (const img of extractedData.images) {
//         if (!allowedTypes.includes(img.type)) {
//           throw new AppError("Unsupported file type.", 400);
//         }

//         // Check file size (4 MB = 4 * 1024 * 1024 bytes)
//         if (img.size > 4 * 1024 * 1024) {
//           throw new AppError("Maximum file size is 4MB.", 400);
//         }

//         const bytes = await img.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const ext = img.type.split("/")[1];
//         const name = `user-${req.user._id}-${Date.now()}.${ext}`;

//         // this does'nt work in vercel
//         // const uploadDir = path.join(
//         //   process.cwd(),
//         //   "public/tempProducts",
//         //   "/" + name
//         // );

//         // this work in verce
//         const tempDir = os.tmpdir();
//         const uploadDir = path.join(tempDir, "/" + name);
//         fs.writeFile(uploadDir, buffer);
//         const { url, public_id } = await uploadImage(
//           uploadDir,
//           "shop/products"
//         );
//         imgUrl.push(url);
//         publicId.push(public_id);
//         // Delete the file after getting the URL
//         // fs.unlink(uploadDir, (err) => {
//         //   if (err) {
//         //     //console.error("Error deleting file:", err);
//         //     throw err;
//         //   }
//         // });
//       }
//       if (imgUrl.length > 0) {
//         extractedData.images = imgUrl;
//         extractedData.public_id = publicId;
//       }
//     }

//     return {
//       data: null,
//       statusCode: 200,
//     };
//   } catch (error) {
//     throw error;

//     // //console.log("err", error);
//     // return NextResponse.json({ ...error });
//   }
// };
export const updateProductImage = async (req, Model) => {
  try {
    const doc = await Model.findById(req.id); //.select("+public_id");

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }

    // Extract form data to get updated images
    const formData = await req.formData();

    // Initialize an empty array to store new image URLs and public IDs
    const newImages = [];
    const newPublicIds = [];
    if (formData.getAll("images").length > 4) {
      throw new AppError("Maximum image number is 4.", 400);
    } // Iterate over each uploaded image
    for (const [name, image] of formData.entries()) {
      // Validate the image
      // Check file type
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(image.type)) {
        throw new AppError("Unsupported file type.", 400);
      }

      // Check file size (4 MB = 4 * 1024 * 1024 bytes)
      if (image.size > 4 * 1024 * 1024) {
        throw new AppError("Maximum file size is 4MB.", 400);
      }

      // Process the image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = image.type.split("/")[1];
      const name = `user-${req.user._id}-${Date.now()}.${ext}`;
      // this does'nt work in vercel
      // const uploadDir = path.join(
      //   process.cwd(),
      //   "public/tempProducts",
      //   "/" + name
      // );

      // this work in verce
      const tempDir = os.tmpdir();
      const uploadDir = path.join(tempDir, "/" + name);
      fs.writeFile(uploadDir, buffer);
      // Upload the image to storage and obtain URL and public ID
      const { url, public_id } = await uploadImage(
        uploadDir,
        // name,
        "shop/products"
      );

      // Add the URL and public ID to the arrays
      newImages.push(url);
      newPublicIds.push(public_id);
    }
    // If the document has public IDs, delete the corresponding images
    if (doc.public_id && doc.public_id.length > 0) {
      for (const public_id of doc.public_id) {
        await destroyImage(public_id);
      }
    }
    // Update the document with the new image URLs and public IDs
    doc.images = newImages;
    doc.public_id = newPublicIds;
    await doc.save();

    return {
      data: doc,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
/**export const updateProductImage = async (req, Model) => {
  try {
    const doc = await Model.findById(req.id).select("+public_id");

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }

    // If the document has public IDs, delete the corresponding images
    if (doc.public_id && doc.public_id.length > 0) {
      for (const public_id of doc.public_id) {
        await destroyImage(public_id);
      }
    }

    // Extract form data to get updated images
    const formData = await req.formData();

    // Convert single image field to array if necessary
    const images = Array.isArray(formData.get("images"))
      ? formData.getAll("images")
      : [formData.get("images")];

    // Initialize an empty array to store new image URLs and public IDs
    const newImages = [];
    const newPublicIds = [];

    // Iterate over each uploaded image
    for (const image of images) {
      // Validate the image
      // Check file type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(image.type)) {
        throw new AppError("Unsupported file type.", 400);
      }

      // Check file size (4 MB = 4 * 1024 * 1024 bytes)
      if (image.size > 4 * 1024 * 1024) {
        throw new AppError("Maximum file size is 4MB.", 400);
      }

      // Process the image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = image.type.split("/")[1];
      const name = `user-${req.user._id}-${Date.now()}.${ext}`;

      // Upload the image to storage and obtain URL and public ID
      const { url, public_id } = await uploadImage(buffer, name, "shop/products");

      // Add the URL and public ID to the arrays
      newImages.push(url);
      newPublicIds.push(public_id);
    }

    // Update the document with the new image URLs and public IDs
    doc.images = newImages;
    doc.public_id = newPublicIds;
    await doc.save();

    return {
      data: null,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
 */
