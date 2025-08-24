import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import SpinnerLoader from '../../Components/Loader/SpinnerLoader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const CreateSessionForm = () => {
    
    const[formData, setFormData] = useState({
        role:"",
        experiance: "",
        topicsToFocus: "",
        description: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault(); 

        const { role, experiance, topicsToFocus } = formData;

        if (!role || !experiance || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            // call ai api to generate questions
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTION, 
                {
                    role,
                    experiance,
                    topicsToFocus,
                    numberOfQuestions:"5",
                }
            );

            // should be array like [{question,answer}, ...]
            const generatedQuestion = aiResponse.data;

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestion,
            });

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
            <h3 className='text-lg font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent'>
                Start a New Interview Journey
            </h3>
            <p className='text-xs text-slate-600 mt-[5px] mb-3'>
                Fill out a few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
                <Input 
                    value={formData.role}
                    onChange={({target}) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(e.g. frontend developer, ui/ux designer, etc.)"
                    type="text"
                />
                <Input 
                    value={formData.experiance}
                    onChange={({target}) => handleChange("experiance", target.value)}
                    label="Years of Experience"
                    placeholder="(e.g. 1 year, 3 years, 5+ years)"
                    type="number"
                />
                
                <Input 
                    value={formData.topicsToFocus}
                    onChange={({target}) => handleChange("topicsToFocus", target.value)}
                    label="Topics To Focus On"
                    placeholder="(Comma-separated, e.g. React, Node.js, MongoDB)"
                    type="text"
                />
                
                <Input 
                    value={formData.description}
                    onChange={({target}) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="(Any specific goals or notes for this session)"
                    type="text"
                />

                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button 
                    type="submit"
                    className='w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50'
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerLoader />} Create Session
                </button>
            </form>
        </div>
  )
}

export default CreateSessionForm
