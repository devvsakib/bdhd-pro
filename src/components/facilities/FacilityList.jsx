import React from 'react'
import FacilityCard from './FacilityCard'

export default function FacilityList({items=[]}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((f)=> <FacilityCard key={f.id || f.name} facility={f} />)}
    </div>
  )
}
