// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import CommentIcon from "@mui/icons-material/Comment";

// export function CheckboxList() {
//   const [checked, setChecked] = useState([0]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   return (
//     <Box sx={{ maxWidth: 250 }} bgcolor={"white"}>
//       <Box>
//         <Typography variant="h3" color="initial">
//           Price
//         </Typography>
//         <Box
//           component="form"
//           sx={{ display: "flex", justifyContent: "space-between" }}
//           flexDirection={"row"}
//           className="space-x-2"
//         >
//           <TextField
//             // id="price"
//             label="Min"
//             // value={}
//             // onChange={}
//             variant="filled"
//           />
//           <TextField
//             // id="price"
//             label="Max"
//             // value={}
//             // onChange={}
//             variant="filled"
//           />
//           <TextField
//             color="text.primary"
//             sx={{ width: 80, cursor: "pointer" }}
//             type="submit"
//             // title="Go"
//             // id="price"
//             // label="submit"
//             value="Go"
//             // onChange={}
//             variant="filled"
//           />
//         </Box>
//       </Box>
//       <List sx={{ width: "100%", bgcolor: "background.paper" }}>
//         {[0, 1, 2, 3].map((value) => {
//           const labelId = `checkbox-list-label-${value}`;

//           return (
//             <ListItem
//               key={value}
//               // secondaryAction={
//               //   <IconButton edge="end" aria-label="comments">
//               //     <CommentIcon />
//               //   </IconButton>
//               // }
//               disablePadding
//             >
//               <ListItemButton
//                 role={undefined}
//                 onClick={handleToggle(value)}
//                 dense
//                 disablePadding
//               >
//                 <ListItemIcon>
//                   <Checkbox
//                     edge="start"
//                     checked={checked.indexOf(value) !== -1}
//                     tabIndex={-1}
//                     disableRipple
//                     inputProps={{ "aria-labelledby": labelId }}
//                   />
//                 </ListItemIcon>
//                 <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>
//     </Box>
//   );
// }
