import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import options from '../../constants/options';

const FormTypeahead = ({ name, value, onChange, multiple, allowNew, required }) => {
    const handleChange = (newValue) => {
        const result = !allowNew ? newValue : newValue.map(elem => elem[name])
        onChange(name, result)
    }
    return (
        < Typeahead
            id={name}
            labelKey={name}
            onChange={handleChange}
            options={options[name] || []}
            selected={value || []}
            allowNew={allowNew}
            newSelectionPrefix={allowNew && "+ "}
            multiple={multiple}
            inputProps={{
                required
            }}
        />
    )
}

// class FormTypeahead extends React.PureComponent {

//     ref = React.createRef();

//     componentDidMount() {
//         this.ref.current.getElementsByTagName('input')[0].setAttribute("required", "true");
//     }

//     onchange = (value) => {
//         const { name, value, allowNew } = this.props;
//         this.props.onChange(name, !allowNew ? value : value.map(elem => elem[name] || elem))
//     }

//     render() {
//         const { name, value, multiple, allowNew } = this.props;

//         return (
//             <div ref={this.ref}>
//                 <Typeahead
//                     id={name}
//                     labelKey={name}
//                     onChange={this.onchange}
//                     options={options[name] || []}
//                     selected={value && value.length > 0 ? value : []}
//                     // defaultInputValue={selected && selected.length > 0 ? selected.join(" ") : ""}
//                     allowNew={allowNew}
//                     newSelectionPrefix={allowNew && "+ "}
//                     multiple={multiple}
//                 />
//             </div>
//         )
//     }
// }

export default FormTypeahead

