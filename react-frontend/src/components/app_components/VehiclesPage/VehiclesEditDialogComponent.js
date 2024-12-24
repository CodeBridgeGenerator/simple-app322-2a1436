import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const VehiclesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            customerId: _entity?.customerId,
make: _entity?.make,
model: _entity?.model,
year: _entity?.year,
licensePlate: _entity?.licensePlate,
vin: _entity?.vin,
        };

        setLoading(true);
        try {
            
        const result = await client.service("vehicles").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info vehicles updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Vehicles" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="vehicles-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerId">CustomerID:</label>
                <InputNumber id="customerId" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerId} onChange={(e) => setValByKey("customerId", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerId"]) && (
              <p className="m-0" key="error-customerId">
                {error["customerId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="make">Make:</label>
                <InputText id="make" className="w-full mb-3 p-inputtext-sm" value={_entity?.make} onChange={(e) => setValByKey("make", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["make"]) && (
              <p className="m-0" key="error-make">
                {error["make"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="model">Model:</label>
                <InputText id="model" className="w-full mb-3 p-inputtext-sm" value={_entity?.model} onChange={(e) => setValByKey("model", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["model"]) && (
              <p className="m-0" key="error-model">
                {error["model"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="year">Year:</label>
                <InputNumber id="year" className="w-full mb-3 p-inputtext-sm" value={_entity?.year} onChange={(e) => setValByKey("year", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["year"]) && (
              <p className="m-0" key="error-year">
                {error["year"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="licensePlate">LicensePlate:</label>
                <InputText id="licensePlate" className="w-full mb-3 p-inputtext-sm" value={_entity?.licensePlate} onChange={(e) => setValByKey("licensePlate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["licensePlate"]) && (
              <p className="m-0" key="error-licensePlate">
                {error["licensePlate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vin">VIN:</label>
                <InputText id="vin" className="w-full mb-3 p-inputtext-sm" value={_entity?.vin} onChange={(e) => setValByKey("vin", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vin"]) && (
              <p className="m-0" key="error-vin">
                {error["vin"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(VehiclesCreateDialogComponent);
