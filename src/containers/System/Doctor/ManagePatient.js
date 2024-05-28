import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";

class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: new Date(),
        };
    }
    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
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
                                <tr>
                                    <th>Name</th>
                                    <th colSpan="2">Telephone</th>
                                </tr>
                                <tr>
                                    <td>Trinh</td>
                                    <td>12345</td>
                                    <td>12345</td>
                                </tr>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
