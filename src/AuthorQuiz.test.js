import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render, configure}  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import Jest from 'jest';

Enzyme.configure({ adapter: new Adapter })

const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David CopperField', 'A Tale of Two Cities', 'Hamlet'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The Adventures of Huckleberry Finn', 'The Adventures of Tom Sawyer', 'The Innocents Abroad', 'The Gilded Age: A Tale of Today']
    },
  },
  highlight: 'none'
}



describe("Author Quiz", () => {
 

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz { ...state } onAnswerSelected={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);       
  });
  describe("When non answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={ () => {} } />) //Enzyme mount function
    });
    it("should have no background color", () => {
      expect(wrapper.find(".turn").props().style.backgroundColor).toBe('');
    })
  }) 

  describe("when the wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={ () => {} } />) //Enzyme mount function
    });
    it("should have a background color", () => {
      expect(wrapper.find(".turn").props().style.backgroundColor).toBe('red');
    })
  });

  describe("when the correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={ () => {} } />) //Enzyme mount function
    });
    it("should have a background color", () => {
      expect(wrapper.find(".turn").props().style.backgroundColor).toBe('green');
    });
  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={ handleAnswerSelected } />); //Enzyme mount function
      wrapper.find('.answer').first().simulate('click');
    });
    it("The on answer selected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("Selected answer should have be The Shining", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
    })
  })
})



 



