import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import AddChannel from './AddChannel';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

export default (modalName) => modals[modalName];
