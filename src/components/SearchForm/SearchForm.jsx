import React, { useState } from 'react';
import './SearchForm.css'
import SearchHotelByAddress from '../SearchHotelByAddress/SearchHotelByAddress'

function SearchForm() {
  const [address, setAddress] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [numberOfNights, setNumberOfNights] = useState('1');
  const [guests, setGuests] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu đã nhập ở đây
  };

  return (
    <form className='form-main' onSubmit={handleSubmit}>
      <div className='form-search'>
        <h2 className="form-title">Tìm kiếm khách sạn</h2>
        <div className="form-group">
          <label htmlFor="address">Thành phố, địa điểm hoặc tên khách sạn:</label>
          <SearchHotelByAddress/>
        </div>

        <div className="form-group">
          <label htmlFor="checkIn">Nhận phòng:</label>
          <input
            className="input-2"
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />


          <label htmlFor="numberOfNights">Số đêm:</label>
          <select
            className="input-2"
            id="numberOfNights"
            value={numberOfNights}
            onChange={(e) => setNumberOfNights(e.target.value)}
          >
            <option value="1">1 đêm</option>
            <option value="2">2 đêm</option>
            <option value="3">3 đêm</option>
            <option value="4">4 đêm</option>
            <option value="5">5 đêm</option>
            <option value="6">6 đêm</option>
            {/* Thêm các tùy chọn số đêm khác tại đây */}
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="guests">Số người</label>
          <input
            className="form-control"
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">Tìm kiếm</button>
      </div>
    </form>
  );
}

export default SearchForm
