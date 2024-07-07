<Accordion style={{ padding: 10 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>Giá phòng</div>
        <div>{formatPrice(costRentHomestay)}</div>
    </AccordionSummary>
    <AccordionDetails>
        {priceCustomForAccomList.length > 0 && (
            <>
                <div>Giá do chủ nhà đưa ra </div>
                <ul>
                    {priceCustomForAccomList.map((priceCustom, index) => (
                        <li
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>{`Ngày ${priceCustom.dateApply}`}</span>
                            <span>{formatPrice(priceCustom.priceApply)}</span>
                        </li>
                    ))}
                </ul>
            </>
        )}

        {dayGapBooking > 0 && (
            <>
                {priceCustomForAccomList.length > 0 ? <div>Những ngày còn lại </div> : <div>Chi tiết giá</div>}
                <div className="price__home">
                    {dataDetailHome.discount > 0 && (
                        <div className="price__before-discount">
                            <div className="title-price"></div>
                            <p className="price__home__root">{formatPrice(pricePerNightOrigin * dayGapBooking)}</p>
                        </div>
                    )}
                    <div className="real-price ">
                        <p className="title-price">{`${formatPrice(pricePerNightCurrent)} x ${dayGapBooking}`}</p>
                        <p>{formatPrice(pricePerNightCurrent * dayGapBooking)}</p>
                    </div>
                </div>
            </>
        )}

        {/* <h2>hahaa</h2> */}
    </AccordionDetails>
</Accordion>;
{
    /* <SurchargeList data={dataDetailHome?.surchargeList} /> */
}
