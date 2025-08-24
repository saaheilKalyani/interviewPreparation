import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { CARD_BG } from '../../utils/data'
import toast from 'react-hot-toast'
import DashboardLayout from '../../Components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import SummaryCard from '../../Components/Cards/SummaryCard'
import moment from "moment"
import Modal from '../../Components/Modal'
import CreateSessionForm from './CreateSessionForm'
import DeleterAlertContent from '../../Components/DeleterAlertContent'

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open:false,
    data:null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open:false, data : null });
      fetchAllSessions(); 
    } catch (error) {
      console.error("Error Deleting Session Data:", error);
    }
  };

  useEffect(()=> {
    fetchAllSessions();
  },[]);

  return (
    <DashboardLayout>
      {/* Background */}
      <div className="w-full min-h-screen bg-gradient-to-br from-emerald-100 via-sky-50 to-teal-100">
        <div className="container mx-auto pt-10 pb-20 px-6">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-10 text-center">
            Your Interview Prep Sessions
          </h1>

          {/* Sessions - staggered masonry feel */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {sessions?.map((data,index) => (
              <div
                key={data?._id}
                className="break-inside-avoid"
              >
                <SummaryCard 
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experiance={data?.experiance || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("DD MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({open:true, data})}
                  className="rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition transform bg-white/90 backdrop-blur-md"
                />    
              </div>
            ))}
          </div>

          {/* Floating Add Button */}
          <button 
            className="h-14 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-sm font-semibold text-white px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-300/50 fixed bottom-10 right-10 transition transform hover:scale-105"
            onClick={() => setOpenCreateModel(true)}
          >
            <LuPlus className="text-2xl text-white" />
            Add new
          </button>
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={openCreateModel}
        onClose={() => setOpenCreateModel(false)}
        hideHeader
      >
        <div className="p-4">
          <CreateSessionForm />
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal 
        isOpen={openDeleteAlert?.open} 
        onClose={() => setOpenDeleteAlert({open:false, data:null})}
        title={"Delete Session"}
      >
        <div className="w-[90vw] md:w-[30vw]">
          <DeleterAlertContent 
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard
