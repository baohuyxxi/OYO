import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import formatPrice from '~/utils/formatPrice';
import { t } from 'i18next';

export default function PopoverPrice(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="popover-price">
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                {t('common.detail')}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <h2 style={{ width: '300px', textAlign: 'center', paddingBottom: '6px' }}>{t('title.priceDetail')}</h2>
                {props?.detailPrice.map((detail, index) => (
                    <div
                        className="item-price-detail"
                        style={{
                            display: 'flex',
                            margin: '0 8px',
                            justifyContent: 'space-between',
                            padding: '5px 15px',
                            alignItems: 'center',
                            background: `${detail.especially && '#64b5f6'}`,
                        }}
                        key={index}
                    >
                        <p style={{ fontSize: '14px', margin: 0 }}>{detail?.day}</p>
                        <p style={{ fontSize: '14px', margin: 0 }}>{formatPrice(detail?.cost)}</p>
                    </div>
                ))}
                <br />
            </Popover>
        </div>
    );
}
