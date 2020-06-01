const initialState = {
  all: [],
  singleVacation: {},
  vacationsFollowed: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_VACATIONS':
      const { vacationsUserFollows, vacations } = action.payload;

      const vacationsToDisplay =
        vacationsUserFollows && vacationsUserFollows.length > 0
          ? vacations
              .filter(vac =>
                vacationsUserFollows.find(
                  vuf => vuf.vacation_id === vac.vacation_id
                )
              )
              .concat(
                vacations.filter(
                  vac =>
                    !vacationsUserFollows.find(
                      vuf => vuf.vacation_id === vac.vacation_id
                    )
                )
              )
          : action.payload.vacations;

      return {
        all: vacationsToDisplay,
        singleVacation: {},
        allVacationsFollowed: action.payload.allVacationsFollowed,
        vacationsUserFollows: action.payload.vacationsUserFollows
      };

    case 'FETCH_SINGLE':
      return { ...state, singleVacation: action.payload };

    case 'ADD_VACATION':
      return { ...state, all: [...state.all, action.payload] };

    case 'EDIT_VACATION':
      const editedVacations = [...state.all];
      const indexToEdit = editedVacations.findIndex(
        vac => vac.vacation_id === action.payload.vacation_id
      );
      editedVacations[indexToEdit] = action.payload;
      return { ...state, all: editedVacations };

    case 'DELETE_VACATION':
      return {
        ...state,
        all: state.all.filter(vac => vac.vacation_id !== action.payload)
      };

    case 'FOLLOW_VACATION':
      const allVacs = [...state.all];

      const vacationClickedToFollow = allVacs.find(
        vac => vac.vacation_id === action.payload.vacation_id
      );
      vacationClickedToFollow.followers++;
      const vacsFollowedNew = [...state.vacationsUserFollows];

      vacsFollowedNew.push(action.payload);
      const reorderedVacationsFol = allVacs
        .filter(vac =>
          vacsFollowedNew.find(vfn => vfn.vacation_id === vac.vacation_id)
        )
        .concat(
          allVacs.filter(
            vac =>
              !vacsFollowedNew.find(vfn => vfn.vacation_id === vac.vacation_id)
          )
        );

      return {
        ...state,
        all: reorderedVacationsFol,
        vacationsUserFollows: [...state.vacationsUserFollows, action.payload]
      };

    case 'UNFOLLOW_VACATION':
      const reorderedVacsUnfollow = [...state.all];
      const vacationClickedToUnfollow = reorderedVacsUnfollow.find(
        vac => vac.vacation_id === action.payload
      );
      vacationClickedToUnfollow.followers--;
      const newVacationsFollowed = state.vacationsUserFollows.filter(
        vac => vac.vacation_id !== action.payload
      );

      const newVacs = reorderedVacsUnfollow
        .filter(vac =>
          newVacationsFollowed.find(vuf => vuf.vacation_id === vac.vacation_id)
        )
        .concat(
          reorderedVacsUnfollow.filter(
            vac =>
              !newVacationsFollowed.find(
                vuf => vuf.vacation_id === vac.vacation_id
              )
          )
        );

      return {
        ...state,
        all: newVacs,
        vacationsUserFollows: state.vacationsUserFollows.filter(
          vac => vac.vacation_id !== action.payload
        )
      };

    default:
      return state;
  }
}
