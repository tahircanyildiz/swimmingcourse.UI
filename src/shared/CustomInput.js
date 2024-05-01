import {  Controller } from 'react-hook-form';

const CustomInput = ({ control, name,type="password", rules = {}, placeholder, readOnly, secureTextEntry, eyeIcon , onEyeIconPress, backgroundColor, keyboardType , autoComplete, multiline, secureText }) => {


  return (
    <div >
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <>
            <div
              >
              <div style={{ flexDirection:'row', justifyContent:'space-between'}}>
                <input
                  type={type}
                  readOnly={readOnly}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  className=' border rounded-lg p-2 font-normal w-full'
                />
              </div>

            </div>
            {error && (
              <div className=' text-xs font-thin' style={{ color: 'red', alignSelf: 'stretch' }}>*{error.message || 'Error'}</div>
            )}
          </>
        )}
      />
    </div>
  );
}


export default CustomInput;