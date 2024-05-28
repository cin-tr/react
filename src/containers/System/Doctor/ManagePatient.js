import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { getAllPatientForDoctor } from "../../../services/userService";

class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
        };
    }
    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate);
    }

    getDataPatient = async (user, formattedDate) => {
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

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            () => {
                let { user } = this.props;
                let { currentDate } = this.state;
                let formattedDate = new Date(currentDate).getTime();
                this.getDataPatient(user, formattedDate);
            }
        );
    };

    handleBtnConfirm = () => {};

    handleBtnRemedy = () => {};

    render() {
        let { dataPatient } = this.state;
        console.log("check patient: ", this.state);
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">Quan ly benh nhan kham benh</div>
                    <div className="manage-patient-body row">
                        <div className="col-4 form-group">
                            <label>Chon ngay kham</label>
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
                                        <th>STT</th>
                                        <th>THOI GIAN</th>
                                        <th>HO VA TEN</th>
                                        <th>DIA CHI</th>
                                        <th>GIOI TINH</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {
                                                            item
                                                                .timeTypeDataPatient
                                                                .valueVi
                                                        }
                                                    </td>
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
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .genderData
                                                                .valueVi
                                                        }
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="mp-btn-confirm"
                                                            onClick={() =>
                                                                this.handleBtnConfirm()
                                                            }
                                                        >
                                                            XAC NHAN
                                                        </button>
                                                        <button
                                                            className="mp-btn-remedy"
                                                            onClick={() =>
                                                                this.handleBtnRemedy()
                                                            }
                                                        >
                                                            GUI HOA DON
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>NO DATA</tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
