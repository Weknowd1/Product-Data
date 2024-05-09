import React, { useState } from 'react';
import "./Product.css"
function ProductForm() {
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        department: "",
        attachment: "",
        location: "",
        captcha: "",
        captchaInput: ""
    });
    const [submittedData, setSubmittedData] = useState(null);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const { captcha, captchaInput, ...formDataWithoutCaptcha } = formData;
            const formDataJSON = JSON.stringify(formDataWithoutCaptcha, null, 2);
            setSubmittedData(formDataJSON);
            if (Object.keys(validateForm).length === 0) {
                fetch('http://localhost:3000/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data)})};
            setFormData({
                productName: "",
                category: "",
                department: "",
                attachment: "",
                location: "",
                captcha: "",
                captchaInput: ""
            });
            generateCaptcha();
            console.log(formDataJSON);
        } else {
            console.log("Please fill all required fields and enter the correct captcha.");
        }
    }
 
    const validateForm = () => {
        return (
            formData.productName.trim() !== "" &&
            formData.category.trim() !== "" &&
            formData.department.trim() !== "" &&
            formData.attachment.trim() !== "" &&
            formData.location.trim() !== "" &&
            formData.captcha.toLowerCase() === formData.captchaInput.toLowerCase().trim()
        );
    }
 
    const generateCaptcha = () => {
        let captcha = Math.random().toString(36).substring(2, 8);
        setFormData((prevState) => ({ ...prevState, captcha }));
    }
 
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type='text' name='productName' value={formData.productName} onChange={handleChange} placeholder='Product Name' /><br /><br />
                <select name='category' value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home_decor">Home Decor</option>
                    <option value="sports_outdoors">Sports & Outdoors</option>
                    <option value="fashion_outdoors">fashion & Outdoors</option>
                </select><br /><br />
                <select name='department' value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="electronics_department">Electronics Department</option>
                    <option value="clothing_department">Clothing Department</option>
                    <option value="home_decor_department">Home Decor Department</option>
                    <option value="sports_outdoors_department">Sports & Outdoors Department</option>
                </select><br /><br />
                <input type='file' name='attachment' onChange={handleChange} /><br /><br />
                <input type='text' name='location' value={formData.location} onChange={handleChange} placeholder='Location' /><br /><br />
                <p>Captcha: {formData.captcha}</p>
                <button type='button' onClick={generateCaptcha}>⟳</button><br /><br />
                <input type='text' name='captchaInput' value={formData.captchaInput} onChange={handleChange} placeholder='Enter CAPTCHA' /><br /><br />
                <button type='submit'>Submit</button>
            </form>
            {submittedData && (
                <div>
                    <h2>Submitted Data</h2>
                    <pre>{submittedData}</pre>
                </div>
            )}
        </div>
    );
}
 
export default ProductForm;