import * as Yup from 'yup';
import { getAxiosWithToken, postAxios } from '../../../service/axios_service';
import { getDateInText, getMonthInText } from '../../../utilities/datetime_utils';
import { setGroupList } from '../../../redux/groups_slice';
import { groupListEndPoint } from '../../../service/api_endpoints';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

export default function CheckListTemplate() {
    const dispatch = useDispatch();

    const [messageSending, setMessageSending] = useState(false);

    const [formValues, setFormValues] = useState({
        session: 'Morning',
        name: '',
        days: '',
        month: '',
        last_date: '',
        file: ''
    });
    const [messageText, setMessageText] = useState(`Good Morning - Dear Team

🌀120 Days Renewal Checklist of July🌀 - Last Date to Receive - 21st July 2024`)

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: Yup.object({
            session: Yup.string()
                .required('Session is required'),
            name: Yup.string()
                .required('Name is required'),
            days: Yup.string()
                .required('Days is required'),
            month: Yup.string()
                .required('Month is required'),
            last_date: Yup.string()
                .required('Last date is required'),
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
        setMessageText(`Good ${formik.values.session} - Dear ${formik.values.name}

🌀${formik.values.days} Days Renewal Checklist of ${getMonthInText(formik.values.month)}🌀 - Last Date to Receive - ${getDateInText(formik.values.last_date)}`)
    }, [formik.values])

    return <div className='flex justify-between'>
        <form id='messagetemplate' onSubmit={formik.handleSubmit} className='w-[300px]'>
            <div className='my-[10px]'>
                <p>Session</p>
                <select name='session' id='session' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.session}>
                    <option value={"Morning"}>Good Morning</option>
                    <option value={"Afternoon"}>Good Afternoon</option>
                    <option value={"Evening"}>Good Evening</option>
                    <option value={"Night"}>Good Night</option>
                </select>
                {formik.errors.session && <p className='text-red-500 text-xs'>{formik.errors.session}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Name</p>
                <input type='text' name='name' id='name' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.name && <p className='text-red-500 text-xs'>{formik.errors.name}</p>}
            </div>
            <div className='my-[10px]'>
                <p>No. Of Days</p>
                <input type='number' name='days' id='days' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.days && <p className='text-red-500 text-xs'>{formik.errors.days}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Renewal Month</p>
                <input type='month' name='month' id='month' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.month && <p className='text-red-500 text-xs'>{formik.errors.month}</p>}
            </div>
            <div className='my-[10px]'>
                <p>Last Date</p>
                <input type='date' name='last_date' id='last_date' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.last_date && <p className='text-red-500 text-xs'>{formik.errors.last_date}</p>}
            </div>
            <div className='my-[10px]'>
                <p>File</p>
                <input type='file' accept='xlsx' name='file' id='file' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.file && <p className='text-red-500 text-xs'>{formik.errors.file}</p>}
            </div>

            <button type='submit' disabled={messageSending} className='w-full bg-primary px-[15px] py-[10px] text-white rounded mt-[30px]'>Send Message</button>
        </form>

        <div className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
                    <p className=' '>Good {formik.values.session} - Dear {formik.values.name}</p><br />
                    <p>🌀{formik.values.days} Days Renewal Checklist of {getMonthInText(formik.values.month)}🌀 - Last Date to Receive - {getDateInText(formik.values.last_date)}</p>
                </div>
    </div>
}