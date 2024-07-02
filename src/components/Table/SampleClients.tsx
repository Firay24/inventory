import { mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import ModalForm from '../Modal'
import { ItemsProps } from '../../interfaces'

const TableSampleClients = ({ items, category, setUpdated }) => {
  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setData] = useState(null)

  const itemsPaginated = data ? data.slice(perPage * currentPage, perPage * (currentPage + 1)) : []
  const numPages = Math.ceil((data ? data.length : 0) / perPage)
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isModalEditActive, setIsModalEditActive] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsModalEditActive(false)
  }

  const handleEditButtonClick = async (item) => {
    setEditItem(item)
    setIsModalEditActive(true)
  }

  const handleSaveEdit = (updatedItem) => {
    const updatedItems = data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    setData(updatedItems)
    localStorage.setItem('items', JSON.stringify(updatedItems))
    setIsModalEditActive(false)
  }

  const getTotalStockCount = (stores) => {
    return stores.reduce((total, store) => total + store.count, 0)
  }

  useEffect(() => {
    if (category === 'all') {
      setData(items)
    } else if (category === 'a') {
      setData(
        items.map((item) => ({
          ...item,
          count: item.store[0].count,
        }))
      )
    } else if (category === 'b') {
      setData(
        items.map((item) => ({
          ...item,
          count: item.store[1].count,
        }))
      )
    }
    setCurrentPage(0)
  }, [category, items])

  useEffect(() => {
    if (isModalEditActive && setUpdated !== undefined) {
      setUpdated(false)
    }
  }, [isModalEditActive, setUpdated])

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <ModalForm
        isActive={isModalEditActive}
        onClose={handleModalAction}
        addItem={handleSaveEdit}
        item={editItem}
        category={category}
        setUpdated={(value) => setUpdated(value)}
      />

      <table>
        <thead>
          <tr>
            <th />
            <th>Nama Barang</th>
            <th>Jumlah Stok</th>
            <th>Terakhir Update</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {itemsPaginated.map((item: ItemsProps) => (
            <tr key={item.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
              </td>
              <td data-label="Nama">{item.name}</td>
              <td data-label="Stok">
                {category === 'all'
                  ? `${items && item.store && getTotalStockCount(item.store)} ${item.unitType}`
                  : `${item.count} ${item.unitType}`}
              </td>
              <td data-label="Edited">
                <small className="text-gray-500 dark:text-slate-400">{item.updatedAt}</small>
              </td>
              <td data-label="Status">
                <Button
                  color={
                    item.store[0].count > item.limit && item.store[1].count > item.limit
                      ? 'info'
                      : 'danger'
                  }
                  onClick={() => setIsModalInfoActive(true)}
                  small
                  label={
                    item.store[0].count > item.limit && item.store[1].count > item.limit
                      ? 'Tersedia'
                      : 'Restock'
                  }
                />
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiPencil}
                    onClick={() => handleEditButtonClick(item)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
