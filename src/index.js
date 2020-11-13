import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import {addField, FieldTitle} from 'ra-core';
import TextField from '@material-ui/core/TextField';
import * as ReactColor from 'react-color';
import get from 'lodash.get';
import pure from 'recompose/pure';
import InputAdornment from '@material-ui/core/InputAdornment';
import {FocusWithin} from 'react-focus-within'

require('./ColorInput.css');

const LightenDarkenColor = (col, amt) => {

    let usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col,16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

const ColorFieldComponent = ({source, record = {}, className}) =>
    (
        <div style={{display: 'flex'}}>
            <div style={{
                width: '20px',
                height: '20px',
                borderWidth: '2px',
                border: 'solid',
                borderColor: LightenDarkenColor(get(record, source), -50),
                background: get(record, source),
                marginRight: '5px',
            }}
            />
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

class ColorInputComponent extends React.Component {
    state = {
        show: false
    };

    handleOpen = () => this.setState({show: true});
    handleClose = () => this.setState({show: false});
    handleChange = ({hex}) => {
        this.props.input.onChange(hex);
        this.forceUpdate();
    };

    render() {
        const {
            label,
            source,
            meta,
            className,
            options,
            picker,
            input,
            resource,
            helperText,
            isRequired,
        } = this.props;

        const {
            touched,
            error,
        } = meta;

        const Picker = ReactColor[`${picker}Picker`];

        return (
            <FocusWithin onBlur={(event) => this.handleClose()}>
                {({focusProps, isFocused}) => (
                    <div {...focusProps}>
                        <TextField
                            {...input}
                            margin="normal"
                            onFocus={this.handleOpen}
                            label={
                                <FieldTitle
                                    label={label}
                                    source={source}
                                    resource={resource}
                                    isRequired={isRequired}
                                />
                            }
                            error={!!(touched && error)}
                            helperText={touched && error || helperText}
                            className={className}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        background: input.value,
                                        marginRight: '5px',
                                    }}
                                    />
                                </InputAdornment>,
                            }}
                        />
                        {
                            this.state.show ?
                                <div className="ColorInput-popup">
                                    <div
                                        className="ColorInput-cover"
                                        onClick={this.handleClose}
                                    />
                                    <Picker
                                        {...options}
                                        color={input.value}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                : null
                        }
                    </div>
                )}
            </FocusWithin>
        )
    }
};

ColorInputComponent.propTypes = {
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

ColorInputComponent.defaultProps = {
    picker: 'Chrome',
    options: {
        disableAlpha: true
    },
};

export const ColorField = PureTextField;
export const ColorInput = addField(ColorInputComponent);
