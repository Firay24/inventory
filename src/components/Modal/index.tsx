/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'

const ModalForm = ({
  isActive,
  onClose,
  addItem,
  item,
  category,
  setUpdated,
  isMain = false,
}: {
  isActive: boolean
  onClose: any
  addItem: any
  item?: any
  setUpdated: any
  category: string
  isMain?: boolean
}) => {
  const [itemCount, setItemCount] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemLimit, setItemLimit] = useState('')
  const [itemUnit, setItemUnit] = useState('')

  useEffect(() => {
    if (item) {
      if (category === 'all') {
        setItemCount(item.store.reduce((total, store) => total + store.count, 0).toString())
      } else {
        const storeIndex = category === 'a' ? 0 : 1
        setItemCount(item.store[storeIndex].count.toString())
      }
    }
  }, [item, category])

  const handleSubmit = () => {
    setUpdated(true)
    if (isMain) {
      const newItem = {
        id: Date.now(),
        name: itemName,
        count: 0,
        store: [
          {
            nameStore: 'Toko A',
            count: parseInt(itemCount) / 2,
          },
          {
            nameStore: 'Toko B',
            count: parseInt(itemCount) / 2,
          },
        ],
        limit: parseInt(itemLimit),
        unitType: itemUnit,
        status: true,
        updatedAt: new Date().toISOString().split('T')[0],
      }
      addItem(newItem)
    } else {
      if (category === 'all') {
        const currentTotalCount = item.store.reduce((total, store) => total + store.count, 0)
        const newTotalCount = parseInt(itemCount)
        if (newTotalCount > currentTotalCount) {
          const difference = newTotalCount - currentTotalCount
          const updatedStore = item.store.map((store) => ({
            ...store,
            count: store.count + difference / 2,
          }))
          const updatedItem = {
            ...item,
            store: updatedStore,
            updatedAt: new Date().toISOString().split('T')[0],
          }
          addItem(updatedItem)
        } else {
          alert('Jumlah baru harus lebih besar dari jumlah saat ini.')
          return
        }
      } else {
        const storeIndex = category === 'a' ? 0 : 1
        const updatedStore = item.store.map((store, index) => {
          if (index === storeIndex) {
            return {
              ...store,
              count: parseInt(itemCount),
            }
          }
          return store
        })
        const updatedItem = {
          ...item,
          store: updatedStore,
          updatedAt: new Date().toISOString().split('T')[0],
        }
        addItem(updatedItem)
      }
    }
    onClose()
    setItemCount('')
    setItemLimit('')
    setItemName('')
    setItemUnit('')
  }

  return (
    <div className={`fixed inset-0 z-50 ${isActive ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {isMain ? 'Tambah data' : 'Edit Data'}
                </h3>
                <div className="mt-2">
                  <form>
                    {isMain ? (
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nama barang
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                      </div>
                    ) : null}
                    <div className="mb-4">
                      <label
                        htmlFor="itemCount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Jumlah Stok
                      </label>
                      <input
                        type="number"
                        id="itemCount"
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        value={itemCount}
                        onChange={(e) => setItemCount(e.target.value)}
                      />
                    </div>
                    {isMain ? (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="itemLimit"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Limit
                          </label>
                          <input
                            type="number"
                            id="itemLimit"
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            value={itemLimit}
                            onChange={(e) => setItemLimit(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="itemUnit"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Satuan unit
                          </label>
                          <input
                            type="text"
                            placeholder="Kg/buah/biji"
                            id="itemUnit"
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            value={itemUnit}
                            onChange={(e) => setItemUnit(e.target.value)}
                          />
                        </div>
                      </>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Simpan
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
