import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFacilities } from '@/store/slices/facilitiesSlice'

export default function useFacilities(){
  const dispatch = useDispatch()
  useEffect(()=>{ dispatch(fetchFacilities()) }, [dispatch])
}
