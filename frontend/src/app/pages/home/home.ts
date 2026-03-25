import { Component } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { RecipesSection } from '../../features/recipes/recipes-section/recipes-section';
import { CategoriesSection } from '../../components/categories-section/categories-section';
import { TrendingSection } from '../../features/recipes/trending-section/trending-section';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [HeroSection, CategoriesSection, TrendingSection, RecipesSection],
})
export class Home {}
