import {render, RenderComponentOptions, screen} from "@testing-library/angular";
import {DuplicateDirective} from "./duplicate.directive";

const renderOptions: RenderComponentOptions<unknown> = {
  imports: [DuplicateDirective]
};

describe('Duplicate Directive', () => {

  it.each([1, 2, 3, 5, 10, 15])(`should render element %s times`, async (duplicateValue) => {
    await render(`<p *ngtDuplicate="${duplicateValue}" data-testid="test"></p>`, renderOptions)
    const elements = screen.getAllByTestId<HTMLParagraphElement>('test');
    expect(elements.length).toEqual(duplicateValue);
  })

  it('should return correct context for index', async () => {
    await render(`<p *ngtDuplicate="5; let index = index" data-testid="test">{{ index }}</p>`, renderOptions);
    const elements = screen.getAllByTestId<HTMLParagraphElement>('test');

    elements.forEach((element, index) => expect(Number(element.textContent)).toEqual(index));
  })

  it('should return correct context for first', async () => {
    await render(`<p *ngtDuplicate="5; let first = first" data-testid="test">{{ first }}</p>`, renderOptions);
    const elements = screen.getAllByTestId<HTMLParagraphElement>('test');

    elements.forEach((element, index) => {
      const booleanValue = element.textContent === 'true';
      const isFirst = index === 0;
      expect(booleanValue).toEqual(isFirst);
    });
  })

  it('should return correct context for last', async () => {
    await render(`<p *ngtDuplicate="5; let last = last" data-testid="test">{{ last }}</p>`, renderOptions);
    const elements = screen.getAllByTestId<HTMLParagraphElement>('test');

    elements.forEach((element, index) => {
      const booleanValue = element.textContent === 'true';
      const isLast = index === elements.length - 1;
      expect(booleanValue).toEqual(isLast);
    });
  })

  it('should return correct context for even', async () => {
    await render(`<p *ngtDuplicate="5; let even = even" data-testid="test">{{ even }}</p>`, renderOptions);
    const elements = screen.getAllByTestId<HTMLParagraphElement>('test');

    elements.forEach((element, index) => {
      const booleanValue = element.textContent === 'true';
      const isEven = index % 2 === 0;
      expect(booleanValue).toEqual(isEven);
    });
  })

  it('should return correct context for odd', async () => {
    await render(`<p *ngtDuplicate="5; let odd = odd" data-testid="test">{{ odd }}</p>`, renderOptions);
    const elements = screen.getAllByTestId<HTMLParagraphElement>('test');

    elements.forEach((element, index) => {
      const booleanValue = element.textContent === 'true';
      const isOdd = index % 2 !== 0;
      expect(booleanValue).toEqual(isOdd);
    });
  })

})
