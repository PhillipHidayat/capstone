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
    image: 'left-eye.jpg',
    onDelete: onDeleteMock,
    reloadPDF: reloadPDFMock,
    annotations: new Map(),
    setAnnotations: setAnnotationsMock,
    pdfToggled: true,
    shorthand: new Map()
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

        // test if the component renders
        expect(getByText('Location')).toBeInTheDocument();
        expect(getByText('Diagnosis')).toBeInTheDocument();
        expect(getByText('Comments')).toBeInTheDocument();

        // test if the default values are set
        expect(getByTestId('location-dropdown')).toHaveValue('Select...');
        expect(getByTestId('diagnosis-dropdown')).toHaveValue('Select...');
        expect(getByTestId('comments')).toHaveValue('');

        // test that buttons are present
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
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: new Map()
        };

        render(<DiagnosisPopup {...props} />);

        // test annotation is set with Iris
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
        
        // test that pdf is reloaded
        expect(reloadPDFMock).toHaveBeenCalled();
    });

    // Test add annotation
    it('adds new annotation on done button', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.click(getByTestId("done-button"))

        const ann = new annotation('', 'Select...', 'Select...', 'left-eye');
        let anns = new Map()
        anns.set(1, ann);

        // test that annotation is added
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
        expect(onSaveMock).toHaveBeenCalledWith(anns);
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
            image: 'right-eye.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: new Map()
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.click(getByTestId("delete-button"))

        // test that annotation is removed
        expect(setAnnotationsMock).toHaveBeenCalledWith(new Map());
        expect(onDeleteMock).toHaveBeenCalledWith(1);
        expect(delete_circleMock).toHaveBeenCalledWith(1);
    });

    // Test outer eye locations
    it('test outer eye annotations', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('', 'Select...', 'Lens', 'left-eye');
        let anns = new Map()
        anns.set(1, ann);

        let loc = getByTestId('location-dropdown');

        // test if annotations are being set for all inner eye locations
        fireEvent.change(loc, { target: { value: 'Lens' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Lids/Lashes';
        fireEvent.change(loc, { target: { value: 'Lids/Lashes' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Anterior Chamber';
        fireEvent.change(loc, { target: { value: 'Anterior Chamber' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Iris';
        fireEvent.change(loc, { target: { value: 'Iris' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Disc';
        fireEvent.change(loc, { target: { value: 'Disc' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Conjunctiva';
        fireEvent.change(loc, { target: { value: 'Conjunctiva' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Cornea';
        fireEvent.change(loc, { target: { value: 'Cornea' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Vitreous';
        fireEvent.change(loc, { target: { value: 'Vitreous' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test macula image locations
    it('test macula annotations', () => {
        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'macula_left.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: new Map(),
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: new Map()
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('', 'Select...', 'Macula', 'macula_left');
        let anns = new Map()
        anns.set(1, ann);

        let loc = getByTestId('location-dropdown');

        // test if annotations are being set
        fireEvent.change(loc, { target: { value: 'Macula' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Vessels'
        fireEvent.change(loc, { target: { value: 'Vessels' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);

        ann.location = 'Other'
        fireEvent.change(loc, { target: { value: 'Other' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test handleDiagnosis
    it('test handleDiagnosis is firing on change', () => {

        const ann = new annotation('', 'Atrophy', 'Disc', 'left-eye');
        const newAnn = new annotation('', 'Drusen', 'Disc', 'macula_left');
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
            image: 'macula_left.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: new Map()
        };

        anns.set(1, newAnn);
        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Drusen' } });

        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test handleComment
    it('test handleComment is firing on change', () => {

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        const ann = new annotation('test comment', 'Select...', 'Select...', 'left-eye');
        let anns = new Map()
        anns.set(1, ann);

        fireEvent.change(getByTestId('comments'), { target: { value: 'test comment' } });

        // test if annotation is being set
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns);
    });

    // Test with existing annotations through multiple changes - outer eye
    it('updates existing outer eye annotations', () => {

        const ann1 = new annotation('comment', 'Select...', 'Lens', 'right-eye');
        const ann2 = new annotation('comment', 'Normal', 'Lids/Lashes', 'right-eye');
        const ann3 = new annotation('comment', 'Normal', 'Anterior Chamber', 'right-eye');
        const ann4 = new annotation('comment', 'Normal', 'Iris', 'right-eye');
        const ann5 = new annotation('comment', 'Normal', 'Disc', 'right-eye');
        const ann6 = new annotation('comment', 'Normal', 'Conjunctiva', 'right-eye');
        const ann7 = new annotation('comment', 'Normal', 'Cornea', 'right-eye');
        const ann8 = new annotation('comment', 'Normal', 'Vitreous', 'right-eye');
        const ann9 = new annotation('comment', 'Normal', 'Other', 'right-eye');
        const ann10 = new annotation('comment', '', 'Select...', 'right-eye');

        let anns = new Map();
        anns.set(1, ann1);
        
        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'right-eye.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: new Map()
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        const res1 = new annotation('comment', 'Normal', 'Disc', 'right-eye');
        let res = new Map();
        
        // fire event handlers for updating existing annotation
        fireEvent.change(getByTestId('location-dropdown'), { target: { value: 'Disc' } });
        res.set(1, res1);
        expect(setAnnotationsMock).toHaveBeenCalledWith(res);
        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Drusen' } });
        fireEvent.change(getByTestId('comments'), { target: { value: 'test comment' } });

        // Make multiple chanes to the annotations, hitting all outer eye locations
        // change to lens
        anns.set(1, ann2);
        render(<DiagnosisPopup {...props} />);

        // change to lids/lashes
        anns.set(1, ann3);
        render(<DiagnosisPopup {...props} />);

        // change to anterior chamber
        anns.set(1, ann4);
        render(<DiagnosisPopup {...props} />);

        // change to iris
        anns.set(1, ann5);
        render(<DiagnosisPopup {...props} />);

        // change to disc
        anns.set(1, ann6);
        render(<DiagnosisPopup {...props} />);

        // change to conjunctiva
        anns.set(1, ann7);
        render(<DiagnosisPopup {...props} />);

        // change to cornea
        anns.set(1, ann8);
        render(<DiagnosisPopup {...props} />);

        // change to vitreous
        anns.set(1, ann9);
        render(<DiagnosisPopup {...props} />);

        // change to other
        anns.set(1, ann10);
        render(<DiagnosisPopup {...props} />);

        const fin = new annotation('comment', '', 'Select...', 'right-eye');
        let final = new Map()
        final.set(1, fin);

        // test that annotations are correct after multiple changes
        expect(props.annotations).toEqual(final);
    });

    // Test with existing annotations through multiple changes - outer eye
    it('updates existing outer eye annotations', () => {

        const ann1 = new annotation('comment', 'Select...', 'Macula', 'macula_right');
        const ann2 = new annotation('comment', 'Normal', 'Vessels', 'macula_right');

        let anns = new Map();
        anns.set(1, ann1);

        let short = new Map();
        short.set('ac', 'Anterior chamber')
        
        const props = {
            X: 222,
            Y: 333,  
            trigger: true,
            setTrigger: setTriggerMock,
            delete_circle: delete_circleMock,
            circle_key: 1,
            onSave: onSaveMock,
            image: 'macula_right.jpg',
            onDelete: onDeleteMock,
            reloadPDF: reloadPDFMock,
            annotations: anns,
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: short
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);
        const res1 = new annotation('comment', 'Normal', 'Macula', 'macula_right');
        let res = new Map();
        
        // fire event handlers for updating existing annotation
        fireEvent.change(getByTestId('location-dropdown'), { target: { value: 'Macula' } });
        res.set(1, res1);
        expect(setAnnotationsMock).toHaveBeenCalledWith(res);
        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Atrophy' } });
        fireEvent.change(getByTestId('comments'), { target: { value: 'ac abnormal' } });

        // Make multiple chanes to the annotations, hitting all outer eye locations
        // change to vessels
        anns.set(1, ann2);
        render(<DiagnosisPopup {...props} />);

        const fin = new annotation('comment', 'Normal', 'Vessels', 'macula_right');
        let final = new Map()
        final.set(1, fin);

        // test that annotations are correct after multiple changes
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
            setAnnotations: setAnnotationsMock,
            pdfToggled: false,
            shorthand: new Map()
        };

        const { getByTestId } = render(<DiagnosisPopup {...props} />);

        // const ann2 = new annotation('comment 2', 'Select...', 'Select...', 'right');
        const ann2 = new annotation('comment 2', 'Select...', 'Select...', '');
        let anns2 = new Map();
        anns2.set(1, ann1);
        anns2.set(2, ann2);

        // add a second annotation
        fireEvent.change(getByTestId('comments'), { target: { value: 'comment 2' } });
        expect(setAnnotationsMock).toHaveBeenCalledWith(anns2);

        fireEvent.change(getByTestId('diagnosis-dropdown'), { target: { value: 'Normal' } });
    });
});
