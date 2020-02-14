import PropTypes from 'prop-types';

export default {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rules: PropTypes.arrayOf(PropTypes.func),
  type: PropTypes.string.isRequired,
  value: PropTypes.shape({
    pristine: PropTypes.bool,
    name: PropTypes.string,
    rules: PropTypes.arrayOf(PropTypes.func),
    value: PropTypes.any,
    success: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  }),
};
