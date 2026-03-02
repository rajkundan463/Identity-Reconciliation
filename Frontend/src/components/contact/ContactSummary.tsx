import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import Card from "../ui/Card"
import Badge from "../ui/Badge"
import Modal from "../ui/Modal"
import ContactGraph from "../graph/ContactGraph"

import { getContact } from "../../api/contactApi"
import { useContactStore } from "../../store/contactStore"

export default function ContactSummary() {

  const contact =
    useContactStore(state => state.contact)

  const setGraph =
    useContactStore(state => state.setGraph)

  const clearGraph =
    useContactStore(state => state.clearGraph)

  const [open, setOpen] =
    useState(false)

  const graphMutation =
    useMutation({

      mutationFn: () =>
        getContact(contact!.primaryContatctId),

      onSuccess: (data) => {

        setGraph(data.graph)
        setOpen(true)
      }
    })

  if (!contact) return null


  const openGraph = () => {

    clearGraph()
    graphMutation.mutate()
  }


  return (

    <>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Contact Summary</span>

            <button
              onClick={openGraph}
              className="text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
            >
              {graphMutation.isPending
                ? "Loading..."
                : "View Graph"}
            </button>
          </div>
        }
      >

        <div className="space-y-4">

          <div>
            <div className="text-sm text-gray-500">
              Primary Contact ID
            </div>

            <div className="text-xl font-semibold">
              {contact.primaryContatctId}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">
              Emails
            </div>

            <div>
              {contact.emails.map(email => (
                <Badge key={email}>
                  {email}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">
              Phone Numbers
            </div>

            <div>
              {contact.phoneNumbers.map(phone => (
                <Badge key={phone}>
                  {phone}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">
              Secondary Contact IDs
            </div>

            <div>
              {contact.secondaryContactIds.length === 0
                ? "None"
                : contact.secondaryContactIds.map(id => (
                    <Badge key={id}>
                      {id}
                    </Badge>
                  ))
              }
            </div>
          </div>

        </div>

      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >

        <div className="h-[500px] w-[800px] max-w-full">

          {graphMutation.isPending
            ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Loading graph...
              </div>
            )
            : (
              <ContactGraph />
            )
          }

        </div>

      </Modal>

    </>
  )
}