import { Component } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { CategoriesSection } from '../../components/categories-section/categories-section';
import { TrendingSection } from '../../components/trending-section/trending-section';
import { Recipe } from '../recipe/recipe';
import { RecipesSection } from '../../components/recipes-section/recipes-section';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [HeroSection, CategoriesSection, TrendingSection, Recipe, RecipesSection],
})
export class Home {}
