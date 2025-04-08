import * as Yup from 'yup';
import { getAxiosWithToken, postAxios } from '../../../service/axios_service';
import { getDateInText, getMonthInText } from '../../../utilities/datetime_utils';
import { setGroupList } from '../../../redux/groups_slice';
import { groupListEndPoint } from '../../../service/api_endpoints';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

export default function NotAttendedListTemplate() {
    const dispatch = useDispatch();

    const [messageSending, setMessageSending] = useState(false);

    const [formValues, setFormValues] = useState({
        year: '',
        file: ''
    });
    const [messageText, setMessageText] = useState(`🎡Below are 1 Year Term Members. Request them to  Attend - I Belong`)

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: Yup.object({
            year: Yup.string()
                .required('Year is required'),
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
        setMessageText(`🎡Below are ${formik.values.year} Year Term Members. Request them to  Attend - I Belong`)
    }, [formik.values])

    return <div className='flex justify-between'>
        <form id='messagetemplate' onSubmit={formik.handleSubmit} className='w-[300px]'>
            <div className='my-[10px]'>
                <p>Year</p>
                <input type='number' name='year' id='year' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.year && <p className='text-red-500 text-xs'>{formik.errors.year}</p>}
            </div>
            <div className='my-[10px]'>
                <p>File</p>
                <input type='file' accept='xlsx' name='file' id='file' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.file && <p className='text-red-500 text-xs'>{formik.errors.file}</p>}
            </div>

            <button type='submit' disabled={messageSending} className='w-full bg-primary px-[15px] py-[10px] text-white rounded mt-[30px]'>Send Message</button>
        </form>

        <div className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
            <p className=' '>🎡Below are {formik.values.year} Year Term Members. Request them to  Attend - I Belong            </p><br />
        </div>
    </div>
}