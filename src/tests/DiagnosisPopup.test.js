import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DiagnosisPopup from '../components/DiagnosisPopup';

const setTriggerMock = jest.fn();
const delete_circleMock = jest.fn();
const onSaveMock = jest.fn();
const onDeleteMock = jest.fn();
const reloadPDFMock = jest.fn();
const setAnnotationsMock = jest.fn();

const props = {
    X: 222,
    Y: 333,  
    trigger: true,
    setTrigger: setTriggerMock,
    delete_circle: delete_circleMock,
    circle_key: 1,
    onSave: onSaveMock,
    image: 'left.jpg',
    onDelete: onDeleteMock,
    reloadPDF: reloadPDFMock,
    annotations: new Map(),
    setAnnotations: setAnnotationsMock
};

class annotation {
    constructor(comment, diagnosis, location, img) {
        this.comment = comment;
        this.diagnosis = diagnosis;
        this.location = location;
        this.img = img;
    }
}

describe('DiagnosisPopup Component Tests', () => {
    // Test case for rendering and initial state
    it('renders correctly and initializes with default values', () => {

        const { getByText, getByTestId } = render(<DiagnosisPopup {...props} />);

        // Check if the component renders
        expect(getByText('Location')).toBeInTheDocument();
        expect(getByText('Diagnosis')).toBeInTheDocument();
        expect(getByText('Comments')).toBeInTheDocument();

        // Check if the default values are set
        expect(getByTestId('location-dropdown')).toHaveValue('Select...');
        expect(getByTestId('diagnosis-dropdown')).toHaveValue('Select...');
        expect(getByTestId('comments')).toHaveValue('');

        // // Verify that buttons are present
        expect(getByText('Done')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });

    // Test case for autopopulating iris
    it('auto selects iris when iris is clicked', () => {

        const props = {
            X: 555,
            Y: 555,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'inner.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: new Map(),
            setAnnotations: setAnnotationsMock
        };

        render(<DiagnosisPopup {...props} />);

        // Check annotation is set with Iris
        let ann = new annotation('', 'Select...', 'Iris', 'inner')
        let m = new Map()
        m.set(1, ann)
        expect(setAnnotationsMock).toHaveBeenCalledWith(m);
    });

    // Test done button
    it('closes popup on done button', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.click(getByTestId("done-button"))

        // test that popup is closing
        expect(setTriggerMock).toHaveBeenCalledWith(false);
    });

    // Test add annotation
    it('adds new annotation on done button', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.click(getByTestId("done-button"))

        const ann = new annotation('', 'Select...', 'Select...', 'left');
        let anns = new Map()
        anns.set(1, ann);

        // test that annotation is added
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test delete button
    it('closes popup on delete button', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.click(getByTestId("delete-button"))

        // test that popup is closing
        expect(setTriggerMock).toHaveBeenCalledWith(false);
    });

    // Test delete annotation
    it('remove annotation on delete button', () => {

        const ann = new annotation('comment', 'Normal', 'Iris', 'right');
        let anns = new Map()
        anns.set(1, ann);

        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'left.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.click(getByTestId("delete-button"))

        // check that annotation is removed
        expect(setAnnotationsMock).toHaveBeenCalledWith(new Map());
    });

    // Test disc
    it('test disc annotation', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('', 'Select...', 'Disc', 'left');
        let anns = new Map()
        anns.set(1, ann);

        let loc = getByTestId('location-dropdown');
        let diag = getByTestId('diagnosis-dropdown');

        // Check if annotation is being set
        fireEvent.change(loc, { target: { value: 'Disc' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test macula
    it('test macula annotation', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('', 'Select...', 'Macula', 'left');
        let anns = new Map()
        anns.set(1, ann);

        let loc = getByTestId('location-dropdown');
        let diag = getByTestId('diagnosis-dropdown');

        // Check if annotation is being set
        fireEvent.change(loc, { target: { value: 'Macula' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test vessels
    it('test vessels annotation', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('', 'Select...', 'Vessels', 'left');
        let anns = new Map()
        anns.set(1, ann);

        let loc = getByTestId('location-dropdown');
        let diag = getByTestId('diagnosis-dropdown');

        // Check if annotation is being set
        fireEvent.change(loc, { target: { value: 'Vessels' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test iris
    it('test iris annotation', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('', 'Select...', 'Iris', 'left');
        let anns = new Map()
        anns.set(1, ann);

        let loc = getByTestId('location-dropdown');
        let diag = getByTestId('diagnosis-dropdown');

        // Check if annotation is being set
        fireEvent.change(loc, { target: { value: 'Iris' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        fireEvent.change(loc, { target: { value: 'Select...' } });
    });

    // Test handleDiagnosis
    it('test handleDiagnosis is firing on change', () => {

        const ann = new annotation('', 'Atrophy', 'Disc', 'left');
        const newAnn = new annotation('', 'Drusen', 'Disc', 'left');
        let anns = new Map()
        anns.set(1, ann);

        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'left.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock
        };

        anns.set(1, newAnn);
        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Drusen' } });

        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test handleComment
    it('test handleComment is firing on change', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('test comment', 'Select...', 'Select...', 'left');
        let anns = new Map()
        anns.set(1, ann);

        fireEvent.change(getByTestId('comments'), { target: { value: 'test comment' } });

        // check if annotation is being set
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test with existing annotation
    it('updates existing annotation', () => {

        const ann1 = new annotation('comment', 'Select...', 'Disc', 'right');
        const ann2 = new annotation('comment', 'Normal', 'Macula', 'right');
        const ann3 = new annotation('comment', 'Normal', 'Vessels', 'right');
        const ann4 = new annotation('comment', 'Normal', 'Iris', 'right');
        const ann5 = new annotation('comment', '', 'Select...', 'right');

        let anns = new Map()
        anns.set(1, ann1);
        
        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'right.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        const res1 = new annotation('comment', 'Normal', 'Vessels', 'right');
        let res = new Map();
        
        // fire event handlers for updating existing annotation
        fireEvent.change(getByTestId('location-dropdown'), { target: { value: 'Vessels' } });
        res.set(1, res1);
        expect(setAnnotationsMock).toHaveBeenCalledWith(res);
        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Dilation' } });
        fireEvent.change(getByTestId('comments'), { target: { value: 'test comment' } });

        // Hit all branches of location checking to change available diagnoses
        // change to macula
        anns.set(1, ann2);
        render(<DiagnosisPopup {...props} />);

        // change to vessels
        anns.set(1, ann3);
        render(<DiagnosisPopup {...props} />);

        // change to iris
        anns.set(1, ann4);
        render(<DiagnosisPopup {...props} />);

        // change to default
        anns.set(1, ann5);
        render(<DiagnosisPopup {...props} />);

        const fin = new annotation('comment', '', 'Select...', 'right');
        let final = new Map()
        final.set(1, fin);

        // check that annotations are correct after multiple changes
        expect(props.annotations).toEqual(final);
    });

    // Test adding multiple annotations
    it('adds multiple annotations', () => {

        const ann1 = new annotation('comment', 'Select...', 'Disc', 'right');
        let anns = new Map()
        anns.set(1, ann1);
        
        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 2,
            onSave: onSaveMock,
            image: 'right.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann2 = new annotation('comment 2', 'Select...', 'Select...', 'right');
        let anns2 = new Map();
        anns2.set(1, ann1);
        anns2.set(2, ann2);

        // add a second annotation
        fireEvent.change(getByTestId('comments'), { target: { value: 'comment 2' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns2);

        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Normal' } });
    });
});
