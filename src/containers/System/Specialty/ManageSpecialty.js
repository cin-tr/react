import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new specialty success!");
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            toast.error("Add new specialty failed!");
        }
    };

    render() {
        return (
            <>
                <div className="manage-specialty-container container">
                    <div className="ms-title">
                        <FormattedMessage id={"manage-specialty.title"} />
                    </div>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage
                                    id={"manage-specialty.name-specialty"}
                                />
                            </label>
                            <input
                                className="form-control "
                                type="text"
                                value={this.state.name}
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "name");
                                }}
                            ></input>
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage
                                    id={"manage-specialty.image"}
                                />
                            </label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => {
                                    this.handleOnChangeImage(event);
                                }}
                            ></input>
                        </div>
                        <div className="col-12">
                            <MdEditor
                                style={{ height: "350px" }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 button">
                            <button
                                className="btn-save-special"
                                onClick={() => {
                                    this.handleSaveNewSpecialty();
                                }}
                            >
                                <FormattedMessage
                                    id={"manage-specialty.save"}
                                />
                            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
