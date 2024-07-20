// wraper async try catch function
// const asyncHandler = (fn) => {
//   async () => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       res.status(err.code || 500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };
// };

//wrapper promise function
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).reject((err) => {
      next(err);
    });
  };
};

export { asyncHandler };
