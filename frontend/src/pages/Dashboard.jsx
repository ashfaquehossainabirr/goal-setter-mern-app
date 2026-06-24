import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from "../components/GoalForm"
import GoalItem from "../components/GoalItem"
import Spinner from "../components/Spinner"
import { getGoals, reset } from "../features/goals/goalSlice"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <div className="dashboard">
      <section className="dashboard-header">
        <h1>Welcome back, <span>{user && user.name}</span></h1>
        <p>Track and manage your goals</p>
      </section>

      {/* Add Goal Form at Top */}
      <div className="dashboard-form">
        <GoalForm />
      </div>

      {/* Goals List Below */}
      <section className="dashboard-content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No goals yet</h3>
            <p>Create your first goal to get started 🚀</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard