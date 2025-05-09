import type { Meta, StoryObj } from '@storybook/angular';

import { fn } from '@storybook/test';

import { RecipeCardComponent } from './recipe-card.component';

const meta: Meta<RecipeCardComponent> = {
  title: 'Recipe',
  component: RecipeCardComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<RecipeCardComponent>;

export const Default: Story = {
  args: {
    recipe: {
      id: 1,
      title: 'Classic Tomato Bruschetta',
      ingredients: [
        { item: 'Baguette slices', quantity: '1', unit: 'loaf' },
        { item: 'Ripe tomatoes', quantity: '3', unit: 'medium' },
        {
          item: 'Fresh basil leaves',
          quantity: '1/4',
          unit: 'cup',
          preparation: 'chopped',
        },
        {
          item: 'Garlic clove',
          quantity: '1',
          unit: 'clove',
          preparation: 'minced',
        },
        {
          item: 'Extra virgin olive oil',
          quantity: '2',
          unit: 'tablespoons',
        },
        {
          item: 'Balsamic glaze',
          quantity: '1',
          unit: 'teaspoon',
          optional: true,
        },
        { item: 'Salt', quantity: 'to taste' },
        { item: 'Black pepper', quantity: 'to taste' },
      ],
      method: '1. Preheat oven to 180°C (350°F). Brush baguette slices with olive oil and bake for 8-10 minutes until lightly golden. 2. In a bowl, combine diced tomatoes, basil, minced garlic, olive oil, salt, and pepper. 3. Spoon the tomato mixture onto the toasted baguette slices. 4. Drizzle with balsamic glaze if desired. Serve immediately.',
      favourite: false
    },
  }
};
