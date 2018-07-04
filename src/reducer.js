var redux = require('redux');
var subjectsDefault = [
    {
        id: 'toan',
        name: 'Toán',
        score: 0
    },
    {
        id: 'van',
        name: 'Văn',
        score: 0
    },
    {
        id: 'anh',
        name: 'Anh',
        score: 0
    },
    {
        id: 'ly',
        name: 'Lý',
        score: 0
    },
    {
        id: 'hoa',
        name: 'Hóa',
        score: 0
    },
    {
        id: 'sinh',
        name: 'Sinh',
        score: 0
    },
    {
        id: 'dia',
        name: 'Địa',
        score: 0
    },
    {
        id: 'su',
        name: 'Sử',
        score: 0
    },
    {
        id: 'gdcd',
        name: 'GDCD',
        score: 0
    }
]

var requireSubjectsDefault = [
    {
        id: 'toan',
        name: 'Toán',
        score: 0
    },
    {
        id: 'van',
        name: 'Văn',
        score: 0
    },
    {
        id: 'anh',
        name: 'Anh',
        score: 0
    }
]
var combineSubjectsDefault = [
    {
        id: 'ly',
        name: 'Lý',
        score: 0
    },
    {
        id: 'hoa',
        name: 'Hóa',
        score: 0
    },
    {
        id: 'sinh',
        name: 'Sinh',
        score: 0
    }
]

var subjectsTHPT = () => {
    return {
        require: ['toan', 'van', 'anh'],
        combine: {
            khtn: ['ly','hoa','sinh'],
            khxh: ['dia', 'su', 'gdcd']
        }
    }
}

var subjectsGDTX = () => {
    return {
        require: ['toan', 'van'],
        combine: {
            khtn: ['ly','hoa','sinh'],
            khxh: ['dia', 'su']
        }
    }
}

var subjects = (state = subjectsDefault, action) => {
    switch(action.type) {
        case 'SET_SCORE':
            var newState = [...state]
            for(var i in newState) {
                if(newState[i].id === action.id) {
                    newState[i].score = action.score
                }
            }
            return newState;
        default:
            return state;
    }
}

var getSubjects = () => {
    var getSubjectsFunc = (listId = [], subjects) => {
        var list = [];
        for(var i of subjects) {
            for(var j of listId) {
                if(i.id === j) {
                    list.push(i);
                }
            }
        }
        return list;
    }
    return getSubjectsFunc;
}

var requireSubjects = (state = requireSubjectsDefault, action) => {
    switch(action.type) {
        case 'SET_REQUIRE_SUBJECT':
            return action.subjects;
        default:
            return state;
    }
}

var combineSubjects = (state = combineSubjectsDefault, action) => {
    switch(action.type) {
        case 'SET_COMBINE_SUBJECT':
            return action.subjects;
        default:
            return state;
    }
}

var isTHPT = (state = true, action) => {
    switch(action.type) {
        case 'SET_IS_THPT':
            return action.value;
        default:
            return state;
    }
}

var isKHTN = (state = true, action) => {
    switch(action.type) {
        case 'SET_IS_KHTN':
            return action.value;
        default:
            return state;
    }
}

var tb12 = (state = 0, action) => {
    switch(action.type) {
        case 'SET_TB12':
            return action.score;
        default:
            return state;
    }
}

var uutien = (state = 0, action) => {
    switch(action.type) {
        case 'SET_UT':
            return action.score;
        default:
            return state;
    }
}

var kk = (state = 0, action) => {
    switch(action.type) {
        case 'SET_KK':
            return action.score;
        default:
            return state;
    }
}

var result = (state = 0, action) => {
    switch(action.type) {
        case 'SET_RESULT':
            return action.score;
        default:
            return state;
    }
}
var sateless = (state = [], action) => {
    switch(action.type) {
        case 'SET_SATELESS':
            return action.items;
        default:
            return state;
    }
}

var reducer = redux.combineReducers({
    requireSubjects,
    combineSubjects,
    isTHPT,
    isKHTN,
    subjects,
    getSubjects,
    subjectsTHPT,
    subjectsGDTX,
    result,
    tb12,
    uutien,
    kk,
    sateless
});

export default reducer;