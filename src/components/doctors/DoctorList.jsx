import React from 'react'
import DoctorCard from './DoctorCard'

export default function DoctorList({items=[]}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((d)=> <DoctorCard key={d.id || d.name} doctor={d} />)}
    </div>
  )
}
