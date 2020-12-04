import React, {useState} from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import {addField, FieldTitle} from 'ra-core';
import {useInput, required} from 'react-admin';
import TextField from '@material-ui/core/TextField';
import * as ReactColor from 'react-color';
import get from 'lodash.get';
import pure from 'recompose/pure';
import InputAdornment from '@material-ui/core/InputAdornment';
import {FocusWithin} from 'react-focus-within'
import { LightenDarkenColor} from "@palustris/js-utils/lib/Color/LightenDarken";

require('./ColorInput.css');

const ColorDot = ({color, amount=-50}) => (
    <div style={{
        width: '20px',
        height: '20px',
        borderWidth: '2px',
        border: 'solid',
        borderColor: LightenDarkenColor(color, amount),
        background: color,
        marginRight: '5px',
    }}
    />

);

const ColorFieldComponent = ({source, record = {}, className}) =>
    (
        <div style={{display: 'flex'}}>
            <ColorDot color={get(record, source)}/>
            <span className={className}>{get(record, source)}</span>
        </div>
    );

ColorFieldComponent.propTypes = {
    addLabel: PropTypes.bool,
    className: PropTypes.string,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureTextField = pure(ColorFieldComponent);

PureTextField.defaultProps = {
    addLabel: true,
};

export const ColorInput = props => {
    const {
        input: { name, onChange, value,...rest },
        meta: { touched, error },
        isRequired
    } = useInput(props);

    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleChange = ({hex}) => {
        onChange(hex);
    }


    const Picker = ReactColor[`${props.picker}Picker`];

    return (
        <FocusWithin onBlur={(event) => handleClose()}>
            {({focusProps, isFocused}) => (
                <div {...focusProps}>
                    <TextField
                        {...props.input}
                        margin="normal"
                        onFocus={handleOpen}
                        label={
                            <FieldTitle
                                label={props.label}
                                source={props.source}
                                resource={props.resource}
                                isRequired={isRequired}
                            />
                        }
                        value={value}
                        error={!!(touched && error)}
                        helperText={touched && error || props.helperText}
                        className={props.className}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <ColorDot color={value}/>
                            </InputAdornment>,
                        }}
                    />
                    {
                        show ?
                            <div className="ColorInput-popup">
                                <div
                                    className="ColorInput-cover"
                                    onClick={handleClose}
                                />
                                <Picker
                                    {...props.options}
                                    color={value}
                                    onChange={handleChange}
                                />
                            </div>
                            : null
                    }
                </div>
            )}
        </FocusWithin>
    )
}

ColorInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.object,
    source: PropTypes.string,
    input: PropTypes.object,
    helperText: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
    className: PropTypes.string,
    picker: (props, propName, componentName) =>
        !ReactColor[`${props[propName]}Picker`] &&
        new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`.`)
};

ColorInput.defaultProps = {
    picker: 'Chrome',
    options: {
        disableAlpha: true
    },
};

export const ColorField = PureTextField;
