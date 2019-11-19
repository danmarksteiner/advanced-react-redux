import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';


beforeEach(() => {
    moxios.install();
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{name: 'Fetch #1'}, {name: 'Fetch #2'}]
    });
});

afterEach(() => {
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Render the entire app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );

    // Find the fetch comments button and click it
    wrapped.find('.fetch-comments').simulate('click');
    
    // Expect to find a list of comments
    // Introduce a pause for moxios
    moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('li').length).toEqual(2);
        done();
        wrapped.unmount();
    });
});
