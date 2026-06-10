import React from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";




const InventoryTab = ({
  inventoryItems,
  loadingListings,
  inventoryFilter,
  setInventoryFilter,
  publishListing,
  closeListing,
  openListing,
}) => {


  const filteredInventoryItems =
  inventoryItems.filter(item => {

    if (inventoryFilter === 'all') {
      return true;
    }

    if (inventoryFilter === 'published') {
      return item.attributes.state === 'published';
    }

    if (inventoryFilter === 'draft') {
      return item.attributes.state === 'draft';
    }

    if (inventoryFilter === 'closed') {
      return item.attributes.state === 'closed';
    }

    return true;

  });
  
  return (
    <>
                <div>

            <div className={css.requestTabs}>
              <div className={css.inventoryTabs}>

                  <button
                    className={
                      inventoryFilter === 'all'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('all')}
                  >
                    All Listings
                  </button>

                  <button
                    className={
                      inventoryFilter === 'published'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('published')}
                  >
                    Active
                  </button>

                  <button
                    className={
                      inventoryFilter === 'draft'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('draft')}
                  >
                    Draft
                  </button>

                  <button
                    className={
                      inventoryFilter === 'closed'
                        ? css.activeTab
                        : css.tabBtn
                    }
                    onClick={() => setInventoryFilter('closed')}
                  >
                    Archived
                  </button>

                </div>
            </div>

            <div className={css.tableWrapper}>
              <table className={css.table}>
                <thead>
                  <tr>
                    <th>Listing Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {loadingListings ? (
                    <tr>
                      <td colSpan="6">Loading listings...</td>
                    </tr>
                  ) : (
                  filteredInventoryItems.map(item =>(
                     <tr key={item.id.uuid}>

                      <td>
                        {item.attributes.title}
                      </td>

                      <td>
                        {item.attributes.publicData?.category || 'General'}
                      </td>

                      <td>

                        {item.attributes.price
                          ? `$${item.attributes.price.amount / 100}`
                          : '-'}

                      </td>

                      <td>
                        {item.attributes.publicData?.quantity || 1}
                      </td>

                      <td>

                        <span
                          className={
                            item.attributes.state === 'published'
                              ? css.activeStatus
                              : css.draftStatus
                          }
                        >
                          {item.attributes.state}
                        </span>

                      </td>

                      <td>

                        <div className={css.actionButtons}>

                            {item.attributes.state === 'draft' ? (

                              <button
                                className={css.publishBtn}
                                onClick={() => publishListing(item.id)}
                              >
                                Publish
                              </button>

                            ) : null}

                            <button
                              className={css.smallBtn}
                              onClick={() => {

                                const slug =
                                  item.attributes.title
                                    .replace(/\s+/g, '-')
                                    .toLowerCase();

                                window.open(
                                  `/l/${slug}/${item.id.uuid}/edit/details`,
                                  '_blank'
                                );

                              }}
                            >
                              Edit
                            </button>
                            {item.attributes.state === 'published' ? (

                              <button
                                className={css.archiveBtn}
                                onClick={() => closeListing(item.id)}
                              >
                                Archive
                              </button>

                            ) : null}
                            <button
                              className={css.smallBtn}
                              onClick={() => {

                                const slug =
                                  item.attributes.title
                                    .replace(/\s+/g, '-')
                                    .toLowerCase();

                                window.open(
                                  `/l/${slug}/${item.id.uuid}`,
                                  '_blank'
                                );

                              }}
                            >
                              View
                            </button>
                                {item.attributes.state === 'closed' ? (

                                  <button
                                    className={css.reopenBtn}
                                    onClick={() => openListing(item.id)}
                                  >
                                    Reopen
                                  </button>

                                ) : null}
                          </div>

                      </td>

                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
    </>
  );
};

export default InventoryTab;