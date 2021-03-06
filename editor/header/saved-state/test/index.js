/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { SavedState } from '../';

describe( 'SavedState', () => {
	it( 'should display saving while save in progress, even if not saveable', () => {
		const wrapper = shallow(
			<SavedState
				isNew
				isDirty={ false }
				isSaving={ true }
				isSaveable={ false } />
		);

		expect( wrapper.text() ).toBe( 'Saving' );
	} );

	it( 'returns null if the post is not saveable', () => {
		const wrapper = shallow(
			<SavedState
				isNew
				isDirty={ false }
				isSaving={ false }
				isSaveable={ false } />
		);

		expect( wrapper.type() ).toBeNull();
	} );

	it( 'should return Saved text if not new and not dirty', () => {
		const wrapper = shallow(
			<SavedState
				isNew={ false }
				isDirty={ false }
				isSaving={ false }
				isSaveable={ true } />
		);

		expect( wrapper.childAt( 0 ).name() ).toBe( 'Dashicon' );
		expect( wrapper.childAt( 1 ).text() ).toBe( 'Saved' );
	} );

	it( 'should return Save button if edits to be saved', () => {
		const statusSpy = jest.fn();
		const saveSpy = jest.fn();
		const wrapper = shallow(
			<SavedState
				isNew={ false }
				isDirty={ true }
				isSaving={ false }
				isSaveable={ true }
				onStatusChange={ statusSpy }
				onSave={ saveSpy } />
		);

		expect( wrapper.name() ).toBe( 'Button' );
		expect( wrapper.childAt( 0 ).text() ).toBe( 'Save' );
		wrapper.simulate( 'click' );
		expect( statusSpy ).toHaveBeenCalledWith( 'draft' );
		expect( saveSpy ).toHaveBeenCalled();
	} );
} );
