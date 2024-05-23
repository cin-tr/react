import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
// import { LANGUAGE } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className="booking-modal-container"
                size="lg"
                centered
                // backdrop={true}
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            Thông tin đặt lịch khám bệnh
                        </span>
                        <span className="right" onClick={closeBookingModal}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor"></div>
                        <div className="price">Gia Kham: 500,000VND</div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Ho ten</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Gioi tinh</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>So dien thoai</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Dia chi lien he</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Dat cho ai</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-12 form-group">
                                <label>Ly do kham</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={closeBookingModal}
                        >
                            Xac nhan
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBookingModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);