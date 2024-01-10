import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { actions } from '../slices';

const Channel = ({ channel, isCurrent, handleSelect }) => {
  const { t } = useTranslation();
  const variant = isCurrent ? 'secondary' : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              key={channel.id}
              variant={variant}
              className="w-100 rounded-0 text-light"
              onClick={handleSelect}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>

            <Dropdown.Toggle split variant={variant} className="flex-grow-0" />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">{t('channels.remove')}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{t('channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            key={channel.id}
            variant={variant}
            type="button"
            className="w-100 rounded-0 text-start text-light"
            onClick={handleSelect}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        )}
    </li>
  );
};

const ChannelsBox = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();

  const handleSelectChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };
  const handleAddChannel = () => {
    dispatch(actions.openModal({ type: 'addChannel' }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4 text-light">
        <b className="p-0 m-0 w-auto h3">{t('channels.channels')}</b>
        <button
          type="button"
          className="p-0 w-auto text-primary btn btn-group-vertical"
          onClick={handleAddChannel}
        >
          <PlusCircleFill size={20} color="#ffffff" />
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleSelect={handleSelectChannel(channel.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
