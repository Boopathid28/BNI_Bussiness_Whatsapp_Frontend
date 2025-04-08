import * as Yup from 'yup';
import { getAxiosWithToken, postAxios } from '../../../service/axios_service';
import { getDateInText, getMonthInText } from '../../../utilities/datetime_utils';
import { setGroupList } from '../../../redux/groups_slice';
import { groupListEndPoint } from '../../../service/api_endpoints';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

export default function RenewalTemplate() {
    const dispatch = useDispatch();

    const [messageSending, setMessageSending] = useState(false);

    const [formValues, setFormValues] = useState({
        name: '',
        renewal_month: '',
        last_date: '',
        renewal_fee_year_one: '',
        renewal_fee_year_two: '',
        file: ''
    });
    const [messageText, setMessageText] = useState(`Dear Team

        🔹Jul Month Renewal🔹- The Last Date to Receive 31st Jul 2024

        Renewal Fee - 1 Year - 41,665 / 2 Year- 66,669`)

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            renewal_month: Yup.string()
                .required('Renewal month is required'),
            last_date: Yup.string()
                .required('Last date is required'),
            renewal_fee_year_one: Yup.string()
                .required('Renewal fee year is required'),
            renewal_fee_year_two: Yup.string()
                .required('Renewal fee year is required'),
            file: Yup.mixed()
                .test('fileFormat', 'Only xlsx files are allowed', value => {
                    if (value) {
                        const supportedFormats = ['xlsx'];
                        return supportedFormats.includes(value.split('.')[value.split('.').length - 1]);
                    }
                    return false;
                })
        }),
        onSubmit: async (values) => {
            var formData = new FormData(document.getElementById('messagetemplate'));
            setMessageSending(true);
            axios.post("https://gate.whapi.cloud/messages/text", {
                "typing_time": 0,
                "body": messageText,
                "to": "120363320304126231@g.us"
            }, {
                headers: {
                    "authorization": `Bearer ${"SwxOU1LRezCsuispa0upA6JZyPY1FtTE"}`
                }
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            setMessageSending(false);
        },
    });



    useEffect(() => {
        setMessageText(`Dear ${formik.values.name}

🔹${getMonthInText(formik.values.renewal_month, 3)} Month Renewal🔹- The Last Date to Receive ${getDateInText(formik.values.last_date, 3)}

Renewal Fee - ${formik.values.renewal_fee_year_one} Year - 41,665 / ${formik.values.renewal_fee_year_two} Year- 66,669`)
    }, [formik.values])
    return <div className='flex justify-between'>
        <form id='messagetemplate' onSubmit={formik.handleSubmit} className='w-[300px]'>
            <div className='my-[10px]'>
                <p>Name</p>
                <input type='text' name='name' id='name' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.name && <p className='text-red-500 text-xs'>{formik.errors.name}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Renewal Month</p>
                <input type='month' name='renewal_month' id='renewal_month' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.renewal_month && <p className='text-red-500 text-xs'>{formik.errors.renewal_month}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Last Date</p>
                <input type='date' name='last_date' id='last_date' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.last_date && <p className='text-red-500 text-xs'>{formik.errors.last_date}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Year 1</p>
                <input type='text' name='renewal_fee_year_one' id='renewal_fee_year_one' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.renewal_fee_year_one && <p className='text-red-500 text-xs'>{formik.errors.renewal_fee_year_one}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Year 2</p>
                <input type='text' name='renewal_fee_year_two' id='renewal_fee_year_two' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.renewal_fee_year_two && <p className='text-red-500 text-xs'>{formik.errors.renewal_fee_year_two}</p>}
            </div>
            <div className='my-[10px]'>
                <p>File</p>
                <input type='file' accept='xlsx' name='file' id='file' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.file && <p className='text-red-500 text-xs'>{formik.errors.file}</p>}
            </div>

            <button type='submit' disabled={messageSending} className='w-full bg-primary px-[15px] py-[10px] text-white rounded mt-[30px]'>Send Message</button>
        </form>

        <div className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
            <p className=''>Dear {formik.values.name},</p><br />
            <p>🔹{getMonthInText(formik.values.renewal_month, 3)} Month Renewal🔹- The Last Date to Receive {getDateInText(formik.values.last_date, 3)}</p><br />
            <p>Renewal Fee - {formik.values.renewal_fee_year_one} Year - 41,665 / <br /> {formik.values.renewal_fee_year_two} Year- 66,669</p>
        </div>
    </div>
}