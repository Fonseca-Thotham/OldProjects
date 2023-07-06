import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { id, isBtnDisabled, innerText, onClick } = this.props;
    return (
      <button
        data-testid={ id }
        type="button"
        disabled={ isBtnDisabled }
        onClick={ onClick }
      >
        { innerText }
      </button>
    );
  }
}
Button.propTypes = {
  id: PropTypes.string.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
  innerText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
