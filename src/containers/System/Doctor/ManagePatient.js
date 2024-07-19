import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
    getAllPatientForDoctor,
    postSendRemedy,
    postSendCancel,
    getAllActionPatientForDoctor,
} from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { times } from "lodash";

class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            dataActionPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }
    async componentDidMount() {
        this.getDataPatient();
        this.getActionDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    getActionDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllActionPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });

        console.log("check res: ", res);

        if (res && res.errCode === 0) {
            this.setState({
                dataActionPatient: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        console.log(data);
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };

    handleBtnCancel = async (item) => {
        let data = await postSendCancel({
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        });
        console.log("data: ", data);
        toast.success("Huỷ lịch thành công!");
        this.setState({
            dataModal: {},
        });
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });

        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        console.log(res);

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Gửi email thành công!");
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error("Gửi email thất bại...");
            console.log("error send remedy: ", res);
        }
    };

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, dataActionPatient } =
            this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-patient-container container">
                        <div className="m-p-title">
                            <FormattedMessage
                                id={"menu.doctor.manage-patient"}
                            />
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage
                                        id={"menu.manage-patient.choose-date"}
                                    />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-group"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.stt"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.time"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.full-name"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.address"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.sex"
                                                    }
                                                />
                                            </th>
                                            <th style={{ width: "250px" }}>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.action"
                                                    }
                                                />
                                            </th>
                                        </tr>
                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGE.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === LANGUAGE.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage
                                                                    id={
                                                                        "patient.booking-modal.btn-confirm"
                                                                    }
                                                                />
                                                            </button>
                                                            <button
                                                                className="mp-btn-confirm cancel"
                                                                onClick={() =>
                                                                    this.handleBtnCancel(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage
                                                                    id={
                                                                        "patient.booking-modal.btn-cancel"
                                                                    }
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        id={
                                                            "patient.booking-modal.no-data"
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className=" col-12 title-action">
                                <FormattedMessage
                                    id={"patient.booking-modal.label"}
                                />
                            </div>

                            <div className="col-12 table-manage-patient table-action">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.stt"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.time"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.full-name"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.address"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={
                                                        "menu.manage-patient.table.sex"
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <FormattedMessage
                                                    id={"table.status"}
                                                />
                                            </th>
                                        </tr>
                                        {dataActionPatient &&
                                        dataActionPatient.length > 0 ? (
                                            dataActionPatient.map(
                                                (item, index) => {
                                                    let time =
                                                        language === LANGUAGE.VI
                                                            ? item
                                                                  .timeTypeDataPatient
                                                                  .valueVi
                                                            : item
                                                                  .timeTypeDataPatient
                                                                  .valueEn;
                                                    let gender =
                                                        language === LANGUAGE.VI
                                                            ? item.patientData
                                                                  .genderData
                                                                  .valueVi
                                                            : item.patientData
                                                                  .genderData
                                                                  .valueEn;

                                                    let action =
                                                        language === LANGUAGE.VI
                                                            ? item
                                                                  .statusIdPatient
                                                                  .valueVi
                                                            : item
                                                                  .statusIdPatient
                                                                  .valueEn;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{time}</td>
                                                            <td>
                                                                {
                                                                    item
                                                                        .patientData
                                                                        .firstName
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item
                                                                        .patientData
                                                                        .address
                                                                }
                                                            </td>
                                                            <td>{gender}</td>
                                                            <td>{action}</td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        id={
                                                            "patient.booking-modal.no-data"
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
