import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  render() {
    return (
      <div id="modal" onClick={this.props.onClickClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img className={css.Largeimg} src={this.props.largeImageUrl} alt="" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };
}

export default Modal;
