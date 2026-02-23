import { useState } from 'react'
import { Home, Users, Zap, MapPin, Edit, X } from 'lucide-react'
import { formatCurrency } from '../utils/currency'

const appliances = [
  { id: 1, name: 'Air Conditioner', category: 'Cooling', wattage: 3500, hours: 8, cost: 2520 },
  { id: 2, name: 'Refrigerator', category: 'Kitchen', wattage: 150, hours: 24, cost: 810 },
  { id: 3, name: 'Washing Machine', category: 'Laundry', wattage: 500, hours: 2, cost: 300 },
  { id: 4, name: 'Water Heater', category: 'Heating', wattage: 4000, hours: 3, cost: 1080 },
  { id: 5, name: 'LED Lights (10)', category: 'Lighting', wattage: 100, hours: 6, cost: 180 },
]

export default function HouseProfile() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [houseData, setHouseData] = useState({
    houseType: 'Apartment',
    residents: 4,
    rooms: 3,
    location: 'Bangalore',
    street: '123 MG Road, Apt 4B',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560001'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHouseData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('houseProfile', JSON.stringify(houseData))
    setShowEditModal(false)
    // Show success message
    alert('House profile updated successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">House Profile</h1>
          <p className="text-neutral-500 mt-1">Manage your household information</p>
        </div>
        <button 
          onClick={() => setShowEditModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Edit className="w-5 h-5" />
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-neutral-800">Edit House Profile</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-neutral-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">House Type</label>
                  <select 
                    name="houseType"
                    value={houseData.houseType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Condo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Residents</label>
                  <input 
                    type="number"
                    name="residents"
                    value={houseData.residents}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Bedrooms</label>
                  <input 
                    type="number"
                    name="rooms"
                    value={houseData.rooms}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">Address</h3>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Street Address</label>
                  <input 
                    type="text"
                    name="street"
                    value={houseData.street}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">City</label>
                    <input 
                      type="text"
                      name="city"
                      value={houseData.city}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">State</label>
                    <input 
                      type="text"
                      name="state"
                      value={houseData.state}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">ZIP Code</label>
                    <input 
                      type="text"
                      name="zipCode"
                      value={houseData.zipCode}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleSave}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* House Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-neutral-500">House Type</span>
          </div>
          <p className="text-xl font-semibold text-neutral-800">{houseData.houseType}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-neutral-500">Residents</span>
          </div>
          <p className="text-xl font-semibold text-neutral-800">{houseData.residents} People</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-sm text-neutral-500">Rooms</span>
          </div>
          <p className="text-xl font-semibold text-neutral-800">{houseData.rooms} Bedrooms</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-neutral-500">Location</span>
          </div>
          <p className="text-xl font-semibold text-neutral-800">{houseData.location}</p>
        </div>
      </div>

      {/* Address */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-500">Street Address</label>
            <p className="text-neutral-800 font-medium mt-1">{houseData.street}</p>
          </div>
          <div>
            <label className="text-sm text-neutral-500">City</label>
            <p className="text-neutral-800 font-medium mt-1">{houseData.city}</p>
          </div>
          <div>
            <label className="text-sm text-neutral-500">State</label>
            <p className="text-neutral-800 font-medium mt-1">{houseData.state}</p>
          </div>
          <div>
            <label className="text-sm text-neutral-500">ZIP Code</label>
            <p className="text-neutral-800 font-medium mt-1">{houseData.zipCode}</p>
          </div>
        </div>
      </div>

      {/* Appliances */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-800">Appliance Inventory</h3>
          <button className="text-sm text-primary hover:text-primary-dark font-medium">
            + Add Appliance
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Appliance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Wattage</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Hours/Day</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Est. Cost/Mo</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance) => (
                <tr key={appliance.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-neutral-800">{appliance.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-600">{appliance.category}</td>
                  <td className="py-4 px-4 text-neutral-600">{appliance.wattage}W</td>
                  <td className="py-4 px-4 text-neutral-600">{appliance.hours}h</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-neutral-800">{formatCurrency(appliance.cost)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-primary hover:text-primary-dark">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Total Estimated Monthly Cost</span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(appliances.reduce((sum, a) => sum + a.cost, 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}



