function setRequireSubjects(subjects) {
    return {
        type: 'SET_REQUIRE_SUBJECT',
        subjects: subjects
    }
}


function setIsTHPT(value) {
    return {
        type: 'SET_IS_THPT',
        value: value
    }
}

function setCombineSubjects(subjects) {
    return {
        type: 'SET_COMBINE_SUBJECT',
        subjects: subjects
    }
}


function setIsKHTN(value) {
    return {
        type: 'SET_IS_KHTN',
        value: value
    }
}

function setScoreSubject(id, score) {
    return {
        type: 'SET_SCORE',
        id: id,
        score: score
    }
}

export {setRequireSubjects, setIsTHPT, setCombineSubjects, setIsKHTN, setScoreSubject}