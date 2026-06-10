import React from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";
import sdk from '../../../util/sdk';
const MessagesTab = ({
  conversations,
  activeConversation,
  setActiveConversation,

  messageText,
  setMessageText,

  messagesEndRef,

  setConversations,

  currentUser,
}) => {
  return (
    <div>
      <div className={css.messagesLayout}>

            {/* CONVERSATION SIDEBAR */}

            <div className={css.conversationSidebar}>

              <div className={css.messagesHeader}>
                Conversations
              </div>

              {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`${css.conversationItem} ${
                      activeConversation?.renter ===
                      conversation.renter
                        ? css.activeConversation
                        : ''
                    }`}
                    onClick={async () => {
console.log('SEND CLICKED 2');
                      setActiveConversation(conversation);

                      try {

                        const messagesResponse =
                          await sdk.messages.query({
                            transactionId:
                              conversation.transactionId,
                          });

                        console.log(
                          'MESSAGES:',
                          messagesResponse
                        );

                    const currentUserId =
                      currentUser?.id?.uuid;

                    const providerId =
                      conversation.providerId;

                    const realMessages =
                      messagesResponse.data.data
                        .reverse()
                        .map(msg => {

                        const sender =
                            msg.attributes.content === messageText
                              ? 'vendor'
                              : 'renter';

                          return {

                            sender,

                            text: msg.attributes.content,

                            time: new Date(
                              msg.attributes.createdAt
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            }),

                          };

                        });

                        setActiveConversation({
                          ...conversation,
                          messages: realMessages,
                        });

                      } catch (e) {

                        console.error(e);

                      }

                    }}
                  >

                  <div className={css.conversationTop}>
                    <h3>{conversation.renter}</h3>
                    <span>{conversation.time}</span>
                  </div>

                  <p className={css.conversationItemName}>
                    {conversation.item}
                  </p>

                  <p className={css.lastMessage}>
                    {conversation.lastMessage}
                  </p>

                  {conversation.unread && (
                    <div className={css.unreadBadge}>
                      New
                    </div>
                  )}

                </div>
              ))}

            </div>

            {/* CHAT AREA */}

            <div className={css.chatArea}>

              <div className={css.chatHeader}>

                <div>
                  <h2>
                    {
                      activeConversation?.renter ||
                      'Select Conversation'
                    }
                  </h2>
                  <p>
                    {
                      activeConversation?.item ||
                      'No active booking'
                    }
                  </p>
                </div>

                <button className={css.smallBtn}>
                  View Booking
                </button>

              </div>

              <div className={css.messagesContainer}>

               {activeConversation?.messages?.map(
                  (message, index) => {

                    console.log(message);
 
                    return (
                   
                    <div
                      key={index}
                      className={
                        message.sender === 'vendor'
                          ? css.vendorMessage
                          : css.renterMessage
                      }
                    > 

                      <div
                            className={
                              message.sender === 'vendor'
                                ? css.vendorBubble
                                : css.renterBubble
                            }
                          >
                            {message.sender} - {message.text}
                          </div>

                      <span className={css.messageTime}>
                        {message.time}
                      </span>

                    </div>

                  );
                })
                }
                <div ref={messagesEndRef}></div>
               </div>

               <div className={css.messageInputArea}>

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={e =>
                    setMessageText(e.target.value)
                  }
                />

                <button
                  className={css.approveBtn}
                  onClick={async () => {
                  console.log('SEND CLICKED 1');
                      if (!activeConversation) {
                      alert('Please select a conversation first');
                      return;
                    }
                    if (!messageText.trim()) {
                          return;
                        }

                        try {
                            console.log(
                              'ACTIVE CONVERSATION:',
                              activeConversation
                            );
                          const newMessage = {
                              sender: 'vendor',
                              text: messageText,
                              time: new Date().toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }),
                            };

                            await sdk.messages.send({
                              transactionId:
                                activeConversation.transactionId,

                              content: messageText,
                            });

                            setActiveConversation(prev => ({
                              ...prev,
                              messages: [
                                ...(prev.messages || []),
                                newMessage,
                              ],
                            }));

                            setMessageText('');

                          const messagesResponse =
                          console.log(
                                'QUERY TRANSACTION:',
                                activeConversation?.transactionId
                              );
                            await sdk.messages.query({
                              transactionId:
                                activeConversation.transactionId,
                            });
                            console.log(
                              'MESSAGES RESPONSE:',
                              messagesResponse
                            );
                          const realMessages =
                              messagesResponse.data.data
                                .reverse()
                                .map(msg => {

                                  const sender =
                                    msg.attributes.content === messageText
                                      ? 'vendor'
                                      : 'renter';

                                  return {

                                    sender,

                              text: msg.attributes.content,

                              time: new Date(
                                msg.attributes.createdAt
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }),

                            }}
                          );

                          const updatedConversation = {
                            ...activeConversation,
                            messages: realMessages,
                          };

                          setActiveConversation({
                            ...updatedConversation,
                            transactionId:
                              activeConversation.transactionId,
                          });

                          setConversations(prev =>
                            prev.map(conversation =>

                              conversation.id ===
                              updatedConversation.id

                                ? updatedConversation
                                : conversation
                            )
                          );
                          setMessageText('');

                        } catch (e) {

                          console.log(e);

                        }

                  }}
                >
                  Send
                </button>

              </div>

            </div>

          </div>
    </div>
  );
};

export default MessagesTab;