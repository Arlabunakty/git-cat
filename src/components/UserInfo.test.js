import React from "react";
import { render } from '@testing-library/react';
import UserInfo from './UserInfo';

test("When fetch in progress inform user", async () => {
    const {container} = render(<UserInfo name='John Doe' avatar_url='https://avatar.com/avatar' email='email@company.com'/>);
    
    const img = container.getElementsByTagName('img');

    expect(container.textContent).toEqual("John Doeemail@company.com");
    expect(img.length).toEqual(1);
    expect(img[0].src).toEqual('https://avatar.com/avatar');
});
