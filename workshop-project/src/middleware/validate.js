export default function validate(schema) {
  return (req, res, next) => {
    try {
      const data = schema.validateSync(req.body, { abortEarly: false });
      req.validated = data;
      next();
    } catch (err) {
      next({ status: 400, message: err.errors || err.message });
    }
  };
}
