import { InputBoxProps } from '@/types/types'

const InputBox: React.FC<InputBoxProps> = ({
    col = 'col-md-12',
    required = true,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled,
    name,
    id,
    label_btn,
    addicon = false,
    btnonClick,
    label_class = '',
}) => (
    <div className={col}>
        <div className="checkout-form-list p-relative">
            <div className="d-flex justify-content-between">
                {label && (
                    <label className={label_class}>
                        {label}{' '}
                        {required && <span className="required">*</span>}
                    </label>
                )}
                {label_btn && label_btn}
            </div>

            <input
                required={required}
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
            />
            {addicon && (
                <button
                    type="button"
                    onClick={btnonClick}
                    className="location-btn"
                >
                    <img src="/assets/media/icons/location.svg" alt="" />
                </button>
            )}
        </div>
    </div>
)
export default InputBox
