import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import moment from "moment";
import { CommonUtils } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { every } from "lodash";

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };

    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } =
            this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className="remedy-modal-container"
                size="lg"
                centered
                // backdrop={true}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        <FormattedMessage id={"remedy.title"} />
                    </h5>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={closeRemedyModal}
                    >
                        <span aria-hidden="true">x</span>
                    </button>
                </div>

                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id={"remedy.email"} />
                            </label>
                            <input
                                className="form-control"
                                type="email"
                                value={this.state.email}
                                onChange={(event) => {
                                    this.handleOnchangeEmail(event);
                                }}
                            ></input>
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id={"remedy.choose-file"} />
                            </label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => {
                                    this.handleOnchangeImage(event);
                                }}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="send"
                        color="primary"
                        onClick={() => this.handleSendRemedy()}
                    >
                        <FormattedMessage id={"remedy.btn-send"} />
                    </Button>
                    <Button
                        className="cancel"
                        color="secondary"
                        onClick={closeRemedyModal}
                    >
                        <FormattedMessage id={"remedy.btn-cancel"} />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
