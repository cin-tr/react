import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGE } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import { has } from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: "",
            selectedProvince: "",
            selectedPayment: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInforStart();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi =
                    type === "USERS"
                        ? `${item.lastName} ${item.firstName}`
                        : item.valueVi;
                let labelEn =
                    type === "USERS"
                        ? `${item.firstName} ${item.lastName}`
                        : item.valueEn;
                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(
                this.props.allDoctors,
                "USERS"
            );
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPayment, resProvince, resPrice } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);

            console.log(
                "new data: ",
                dataSelectPrice,
                dataSelectPayment,
                dataSelectProvince
            );

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
            });
        }
        console.log(`Option selected:`, res);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container container">
                <div className="manage-doctor-title ">
                    <FormattedMessage id={"admin.manage-doctor.title"} />
                </div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.select-doctor"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={
                                <div>
                                    <i class="fas fa-user-md"></i>
                                    <FormattedMessage
                                        id={"admin.manage-doctor.select-doctor"}
                                    />
                                </div>
                            }
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.intro"}
                            />
                        </label>
                        <textarea
                            className="form-control"
                            rows="2"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>Chon gia</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={
                                "chon gia"
                                // <div>
                                //     <i class="fas fa-user-md"></i>
                                //     <FormattedMessage
                                //         id={"admin.manage-doctor.select-doctor"}
                                //     />
                                // </div>
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chon phuong thuc thanh toan</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={
                                "chon phuong thuc thanh toan"
                                // <div>
                                //     <i class="fas fa-user-md"></i>
                                //     <FormattedMessage
                                //         id={"admin.manage-doctor.select-doctor"}
                                //     />
                                // </div>
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chon tinh thanh</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={
                                "chon tinh thanh"
                                // <div>
                                //     <i class="fas fa-user-md"></i>
                                //     <FormattedMessage
                                //         id={"admin.manage-doctor.select-doctor"}
                                //     />
                                // </div>
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Ten phong kham</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Dia chi phong kham</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Note</label>
                        <input className="form-control" />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={
                        hasOldData === true
                            ? "save-content-doctor"
                            : "create-content-doctor"
                    }
                >
                    {hasOldData === true ? (
                        <span>
                            <FormattedMessage id={"admin.manage-doctor.save"} />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id={"admin.manage-doctor.add"} />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInforStart: () =>
            dispatch(actions.getRequiredDoctorInforStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
